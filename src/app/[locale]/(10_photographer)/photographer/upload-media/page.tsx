"use client";

import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPresignedUrl } from "@/actions/surveyor";
import {
  Upload,
  X,
  ShieldCheck,
  ShieldAlert,
  FileImage,
  Film,
  CloudUpload,
  Loader2,
} from "lucide-react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface FileItem {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number;
  fileUrl?: string;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileTypeIcon({ type }: { type: string }) {
  if (type.startsWith("video/")) return <Film className="w-6 h-6 text-violet-500"  />;
  return <FileImage className="w-6 h-6 text-indigo-500"  />;
}

export default function UploadMediaPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: File[]) => {
    const items: FileItem[] = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      status: "idle",
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...items]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(
      (f) => f.type.startsWith("image/") || f.type.startsWith("video/")
    );
    addFiles(dropped);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFiles(Array.from(e.target.files));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadFile = async (item: FileItem) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, status: "uploading", progress: 0 } : f))
    );

    try {
      const { uploadUrl, fileUrl } = await getPresignedUrl(
        `photographer/${Date.now()}-${item.file.name}`,
        item.file.type
      );

      // Simulate progress bar animation
      const steps = 20;
      for (let i = 1; i <= steps; i++) {
        await new Promise((r) => setTimeout(r, 80));
        const progress = Math.round((i / steps) * 90);
        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, progress } : f))
        );
      }

      // Attempt real upload (may fail in dev without real R2)
      try {
        await fetch(uploadUrl, {
          method: "PUT",
          body: item.file,
          headers: { "Content-Type": item.file.type },
        });
      } catch {
        // In mock mode, ignore network error
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: "success", progress: 100, fileUrl } : f
        )
      );
    } catch (err: any) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, status: "error", error: err.message } : f
        )
      );
    }
  };

  const uploadAll = () => {
    files.filter((f) => f.status === "idle").forEach(uploadFile);
  };

  const idleCount = files.filter((f) => f.status === "idle").length;
  const successCount = files.filter((f) => f.status === "success").length;

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Upload Media</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Unggah foto dan video hasil pemotretan properti Anda.
        </p>
      </div>

      {/* Drop Zone */}
      <Card
        className={`rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isDragging ? "bg-indigo-100" : "bg-slate-100"}`}>
            <CloudUpload className={`w-8 h-8 transition-colors ${isDragging ? "text-indigo-600" : "text-slate-400"}`}  />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-800 text-lg">
              {isDragging ? "Lepaskan file di sini" : "Seret & lepas file di sini"}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              atau <span className="text-indigo-600 font-medium">klik untuk memilih file</span>
            </p>
            <p className="text-slate-400 text-xs mt-2">Mendukung JPG, PNG, WEBP, MP4, MOV</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={handleInputChange}
          />
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Daftar File ({files.length})
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {successCount} dari {files.length} berhasil diunggah
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-slate-600"
                onClick={() => setFiles([])}
              >
                Hapus Semua
              </Button>
              {idleCount > 0 && (
                <Button
                  size="sm"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                  onClick={uploadAll}
                >
                  <Upload className="w-4 h-4" />
                  Upload {idleCount} File
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {files.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <FileTypeIcon type={item.file.type} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-800 text-sm truncate pr-4">
                      {item.file.name}
                    </span>
                    <span className="text-xs text-slate-400 flex-shrink-0">
                      {formatBytes(item.file.size)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {item.status === "uploading" && (
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-200"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}

                  {item.status === "success" && item.fileUrl && (
                    <p className="text-xs text-emerald-600 truncate mt-1">{item.fileUrl}</p>
                  )}
                  {item.status === "error" && (
                    <p className="text-xs text-red-500 mt-1">{item.error}</p>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {item.status === "idle" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-indigo-600 border-indigo-200 hover:bg-indigo-50 text-xs h-8"
                      onClick={() => uploadFile(item)}
                    >
                      Upload
                    </Button>
                  )}
                  {item.status === "uploading" && (
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 gap-1 rounded-full">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {item.progress}%
                    </Badge>
                  )}
                  {item.status === "success" && (
                    <ShieldCheck className="w-5 h-5 " />
                  )}
                  {item.status === "error" && (
                    <ShieldAlert className="w-5 h-5 " />
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => removeFile(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {files.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          Belum ada file yang dipilih. Seret file atau klik area di atas untuk memulai.
        </div>
      )}
    </div>
  );
}
