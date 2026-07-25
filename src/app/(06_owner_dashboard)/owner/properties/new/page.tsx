"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { UploadCloud, MapPin, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'Informasi Dasar' },
  { id: 2, name: 'Lokasi Interaktif' },
  { id: 3, name: 'Unggah Media' },
  { id: 4, name: 'Dokumen Legal PDF' }
];

export default function NewPropertyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      router.push("/owner/properties");
    }, 1500);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header & Stepper */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Tambah Properti Baru</h1>
          <p className="text-slate-500 mt-2">Ikuti langkah-langkah berikut untuk mempublikasikan properti Anda.</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full hidden sm:block"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 rounded-full hidden sm:block transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <ul className="relative flex justify-between w-full sm:flex-row flex-col sm:gap-0 gap-4">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <li key={step.id} className="flex items-center sm:flex-col sm:gap-2 gap-4 bg-white sm:bg-transparent">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 z-10 border-2
                    ${isActive ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-110' : 
                      isCompleted ? 'bg-blue-50 text-blue-600 border-blue-600' : 
                      'bg-white text-slate-400 border-slate-200'}
                  `}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-blue-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3 mb-6">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        <div className="space-y-8">
          {/* Step 1: Informasi Dasar */}
          {currentStep === 1 && (
            <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
                <CardTitle className="text-xl font-semibold text-slate-800">Informasi Dasar</CardTitle>
                <CardDescription className="text-sm mt-1">Detail utama tentang properti yang Anda sewakan atau jual.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-slate-700 font-medium">Judul Properti</Label>
                  <Input id="title" name="title" required placeholder="Contoh: Apartemen Modern Sudirman" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="price" className="text-slate-700 font-medium">Harga (IDR)</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-slate-500 font-medium">Rp</span>
                      <Input id="price" name="price" type="number" required placeholder="0" className="pl-12 h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="propertyType" className="text-slate-700 font-medium">Tipe Properti</Label>
                    <Select name="propertyType" defaultValue="HOUSE">
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-blue-500 text-base">
                        <SelectValue placeholder="Pilih tipe" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="APARTMENT">Apartemen</SelectItem>
                        <SelectItem value="HOUSE">Rumah</SelectItem>
                        <SelectItem value="VILLA">Villa</SelectItem>
                        <SelectItem value="LAND">Tanah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-slate-700 font-medium">Deskripsi</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Ceritakan fitur unik, fasilitas, dan keunggulan properti ini..." 
                    className="min-h-[140px] rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 resize-y text-base p-4" 
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Lokasi Interaktif */}
          {currentStep === 2 && (
            <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
                <CardTitle className="text-xl font-semibold text-slate-800">Lokasi Interaktif</CardTitle>
                <CardDescription className="text-sm mt-1">Tentukan lokasi akurat properti Anda di peta.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-slate-700 font-medium">Alamat Lengkap</Label>
                  <Input id="address" name="address" placeholder="Jl. Sudirman No. 123" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
                </div>
                
                <div className="h-64 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-6.2088,106.8456&zoom=12&size=800x400&style=feature:all|element:labels|visibility:off')] bg-cover bg-center" />
                  <div className="z-10 flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-slate-200/50 transition-transform hover:scale-105 cursor-pointer">
                    <MapPin className="h-8 w-8 text-blue-500 mb-3" />
                    <span className="text-sm font-semibold text-slate-700">Tentukan Pin di Peta</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Unggah Media */}
          {currentStep === 3 && (
            <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
                <CardTitle className="text-xl font-semibold text-slate-800">Unggah Media</CardTitle>
                <CardDescription className="text-sm mt-1">Tambahkan foto berkualitas tinggi untuk menarik lebih banyak peminat.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="relative flex flex-col items-center justify-center w-full min-h-[300px] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-100/50 hover:border-blue-400 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
                    <div className="w-20 h-20 mb-6 rounded-full flex items-center justify-center bg-slate-200/50 text-slate-500">
                      <UploadCloud className="h-10 w-10" />
                    </div>
                    <p className="mb-2 text-base text-slate-700">
                      <span className="font-semibold text-blue-600">Klik untuk unggah</span> atau seret dan lepas
                    </p>
                    <p className="text-sm text-slate-500">Mendukung JPG, PNG, WEBP (Maks. 5MB per foto)</p>
                  </div>
                  <input 
                    type="file" 
                    name="images"
                    multiple 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Dokumen Legal PDF */}
          {currentStep === 4 && (
            <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
                <CardTitle className="text-xl font-semibold text-slate-800">Dokumen Legal</CardTitle>
                <CardDescription className="text-sm mt-1">Unggah sertifikat hak milik (SHM/HGB) atau dokumen pendukung lainnya dalam format PDF.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="relative flex flex-col items-center justify-center w-full min-h-[250px] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-100/50 hover:border-blue-400 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
                    <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-red-100/50 text-red-500">
                      <FileText className="h-8 w-8" />
                    </div>
                    <p className="mb-2 text-base text-slate-700">
                      <span className="font-semibold text-blue-600">Unggah PDF Dokumen</span>
                    </p>
                    <p className="text-sm text-slate-500">Hanya format PDF (Maks. 10MB)</p>
                  </div>
                  <input 
                    type="file" 
                    name="documents"
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="rounded-full px-6 h-12 border-slate-300"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            
            {currentStep < steps.length ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="rounded-full px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={loading}
                className="rounded-full px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
              >
                {loading ? "Menyimpan..." : "Publikasikan Properti"}
                {!loading && <CheckCircle2 className="w-4 h-4 ml-2" />}
              </Button>
            )}
          </div>

        </div>
      </form>
    </div>
  );
}
