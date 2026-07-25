"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function UploadPhotoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    // Mock fetching presigned URL
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock uploading to S3 using presigned URL
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploading(false);
    setUploaded(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Property Photos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Photo Upload</CardTitle>
          <CardDescription>Upload photos of the property using presigned URLs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo">Select Photo</Label>
              <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {file && (
              <div className="text-sm text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              disabled={!file || uploading || uploaded}
              className="w-full sm:w-auto"
            >
              {uploading ? (
                "Uploading..."
              ) : uploaded ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Uploaded Successfully</>
              ) : (
                <><UploadCloud className="w-4 h-4 mr-2" /> Upload Photo</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
