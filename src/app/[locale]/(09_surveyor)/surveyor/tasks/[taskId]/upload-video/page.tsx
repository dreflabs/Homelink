"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, ShieldCheck, Video } from 'lucide-react';
import { getPresignedUrl } from '@/actions/surveyor';

export default function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploaded(false);
      setProgress(0);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const { uploadUrl } = await getPresignedUrl(file.name, file.type);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl, true);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`Upload failed with status ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.send(file);
      });

      setUploaded(true);
    } catch (err) {
      console.error("Error uploading video:", err);
      setError("Gagal mengunggah video. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Property Video</h1>
      <Card>
        <CardHeader>
          <CardTitle>Video Upload</CardTitle>
          <CardDescription>Upload video tour of the property. Large files are supported via presigned URLs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video">Select Video</Label>
              <Input id="video" type="file" accept="video/*" onChange={handleFileChange} />
            </div>

            {file && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Video className="w-4 h-4" />
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}

            {uploading && (
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading || uploaded}
              className="w-full sm:w-auto"
            >
              {uploading ? (
                `Uploading... ${progress}%`
              ) : uploaded ? (
                <><ShieldCheck className="w-5 h-5 mr-2" /> Uploaded Successfully</>
              ) : (
                <><UploadCloud className="w-4 h-4 mr-2" /> Upload Video</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
