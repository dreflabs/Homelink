"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadDocument } from "@/actions/documents";
import { toast } from "sonner";

export function DocumentUploadDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [docType, setDocType] = useState("Identitas");

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("type", docType);
    const result = await uploadDocument(formData);
    
    setIsUploading(false);

    if (result.success) {
      toast.success("Dokumen berhasil diunggah.");
      setIsOpen(false);
    } else {
      toast.error(result.error || "Gagal mengunggah dokumen.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className="gap-2" />}>
        <Upload className="w-4 h-4"/> Unggah Dokumen Baru
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unggah Dokumen</DialogTitle>
          <DialogDescription>
            Pilih file dokumen yang ingin Anda unggah (Maksimal 5MB, format PDF/JPG/PNG).
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleUpload} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nama Dokumen</Label>
            <Input id="title" name="title" placeholder="Contoh: KTP Saya" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Jenis Dokumen</Label>
            <Select value={docType} onValueChange={(val) => val && setDocType(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Identitas">Identitas (KTP/Paspor)</SelectItem>
                <SelectItem value="Keuangan">Keuangan (Slip Gaji/Mutasi)</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">File Dokumen</Label>
            <Input id="file" name="file" type="file" required accept=".pdf,image/*" />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Simpan Dokumen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
