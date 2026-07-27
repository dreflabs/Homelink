"use client";

import { useState } from "react";
import { Building, MapPin, Calculator, Loader2, Bath, BedDouble, ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIValuationPage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    location: "",
    propertyType: "house",
    landArea: "",
    buildingArea: "",
    bedrooms: "3",
    bathrooms: "2",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    // Simulate AI calculation
    setTimeout(() => {
      setIsCalculating(false);
      setResult("Rp 1.5 M - 1.8 M");
    }, 2500);
  };

  const inputClass = "w-full bg-white border border-slate-200 text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400 text-sm shadow-sm";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-6 md:p-10 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-primary p-1.5 rounded-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">AI-Powered</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter leading-[1.05] text-slate-900 mb-2">
          AI Property Valuation
        </h1>
        <p className="text-slate-500 max-w-xl leading-relaxed">
          Ketahui estimasi harga pasar properti Anda secara instan dengan algoritma machine learning kami yang menganalisis ribuan data properti.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
            <h2 className="text-lg font-semibold tracking-tighter leading-[1.05] text-slate-900 flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              Detail Properti
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Location */}
              <div>
                <label className={labelClass}>Lokasi Properti</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="Contoh: Jakarta Selatan, Kemang"
                    className={`${inputClass} pl-10`}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              {/* Areas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Luas Tanah (m²)</label>
                  <input
                    required
                    type="number"
                    placeholder="Misal: 120"
                    className={inputClass}
                    value={formData.landArea}
                    onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Luas Bangunan (m²)</label>
                  <input
                    required
                    type="number"
                    placeholder="Misal: 100"
                    className={inputClass}
                    value={formData.buildingArea}
                    onChange={(e) => setFormData({ ...formData, buildingArea: e.target.value })}
                  />
                </div>
              </div>

              {/* Rooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`${labelClass} flex items-center gap-1.5`}>
                    <BedDouble className="w-4 h-4 text-slate-400" /> Kamar Tidur
                  </label>
                  <select
                    className={inputClass}
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  >
                    <option value="1">1 Kamar</option>
                    <option value="2">2 Kamar</option>
                    <option value="3">3 Kamar</option>
                    <option value="4">4 Kamar</option>
                    <option value="5+">5+ Kamar</option>
                  </select>
                </div>
                <div>
                  <label className={`${labelClass} flex items-center gap-1.5`}>
                    <Bath className="w-4 h-4 text-slate-400" /> Kamar Mandi
                  </label>
                  <select
                    className={inputClass}
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  >
                    <option value="1">1 Kamar Mandi</option>
                    <option value="2">2 Kamar Mandi</option>
                    <option value="3">3 Kamar Mandi</option>
                    <option value="4+">4+ Kamar Mandi</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isCalculating}
                className="w-full py-6 rounded-xl bg-primary hover:bg-primary text-white font-semibold text-base transition-all shadow-sm disabled:opacity-60"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Menganalisis Pasar...
                  </>
                ) : (
                  <>
                    Hitung Estimasi Harga
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-2">
          {isCalculating ? (
            <div className="h-full min-h-[300px] bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-card">
              <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
              <div>
                <p className="text-slate-700 font-semibold">Menghubungkan ke Database AI...</p>
                <p className="text-sm text-slate-400 mt-1">Menganalisis nilai pasar terkini</p>
              </div>
            </div>
          ) : result ? (
            <div className="h-full bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-card hover:shadow-card-hover transition-all">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-primary text-xs font-semibold mb-6 w-fit">
                <Sparkles className="w-3 h-3" /> Hasil Analisis AI
              </div>
              
              <p className="text-sm text-slate-500 mb-1">Estimasi Harga Properti</p>
              <div className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                {result}
              </div>
              
              <div className="space-y-3 mt-auto">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-500 font-medium">Confidence Score</p>
                    <span className="text-sm font-bold text-emerald-600">94% — Akurasi Tinggi</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[94%] rounded-full"></div>
                  </div>
                </div>

                <div className="flex gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                    <span>Harga naik 8% dari tahun lalu</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Data dari 50.000+ transaksi</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full border-slate-200 text-primary hover:bg-slate-50 font-medium">
                  Lihat Analisis Mendalam
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] bg-white border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-card">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                <Building className="w-7 h-7 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-600 font-semibold">Belum Ada Data</p>
                <p className="text-sm text-slate-400 mt-1">Isi form di samping untuk melihat estimasi harga properti Anda.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
