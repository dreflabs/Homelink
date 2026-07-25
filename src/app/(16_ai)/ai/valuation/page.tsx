"use client";

import { useState } from "react";
import { Building2, MapPin, Calculator, Loader2, Home, Bath, BedDouble, ArrowRight } from "lucide-react";
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

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 md:p-8 overflow-y-auto relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent inline-block mb-2">
          AI Property Valuation
        </h1>
        <p className="text-zinc-400 max-w-xl">
          Ketahui estimasi harga pasar properti Anda secara instan dengan algoritma machine learning kami yang menganalisis ribuan data properti.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-purple-400" />
              Detail Properti
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Lokasi Properti</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      required
                      type="text"
                      placeholder="Contoh: Jakarta Selatan, Kemang"
                      className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-600"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Luas Tanah (m²)</label>
                    <input
                      required
                      type="number"
                      placeholder="Misal: 120"
                      className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-600"
                      value={formData.landArea}
                      onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Luas Bangunan (m²)</label>
                    <input
                      required
                      type="number"
                      placeholder="Misal: 100"
                      className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-zinc-600"
                      value={formData.buildingArea}
                      onChange={(e) => setFormData({ ...formData, buildingArea: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-zinc-400" /> Kamar Tidur
                    </label>
                    <select
                      className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none"
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
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-2">
                      <Bath className="w-4 h-4 text-zinc-400" /> Kamar Mandi
                    </label>
                    <select
                      className="w-full bg-black/50 border border-zinc-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none"
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
              </div>

              <Button
                type="submit"
                disabled={isCalculating}
                className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-lg transition-all border-none shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-70 disabled:shadow-none relative overflow-hidden group"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Menganalisis Pasar...
                  </>
                ) : (
                  <>
                    Hitung Estimasi Harga
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                {/* Shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </Button>
            </form>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-2">
          {isCalculating ? (
            <div className="h-full min-h-[300px] bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
              <div>
                <p className="text-zinc-300 font-medium animate-pulse">Menghubungkan ke Database AI...</p>
                <p className="text-sm text-zinc-500 mt-1">Menganalisis nilai pasar terkini</p>
              </div>
            </div>
          ) : result ? (
            <div className="h-full bg-gradient-to-b from-purple-900/40 to-black border border-purple-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6 w-fit">
                  <Building2 className="w-3 h-3" /> Hasil Analisis AI
                </div>
                
                <h3 className="text-zinc-400 mb-1">Estimasi Harga Properti</h3>
                <div className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  {result}
                </div>
                
                <div className="space-y-4 mt-auto">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-xs text-zinc-400 mb-1">Confidence Score</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-semibold text-emerald-400">94%</span>
                      <span className="text-xs text-zinc-500 mb-1">Akurasi Tinggi</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[94%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full bg-transparent border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200">
                    Lihat Analisis Mendalam
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] bg-zinc-900/30 border border-zinc-800/50 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center">
                <Home className="w-8 h-8 text-zinc-500" />
              </div>
              <div>
                <p className="text-zinc-400 font-medium">Belum Ada Data</p>
                <p className="text-sm text-zinc-600 mt-1">Isi form di samping untuk melihat estimasi harga properti Anda.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
