import { Button } from '@/components/ui/button';
import { CalendarCheck } from "lucide-react";

export function StickyBookingPanel({ price }: { price: number }) {
  // Format price
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(price);

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-card border border-slate-100 p-6 flex flex-col gap-6">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">Harga Mulai</p>
        <h3 className="text-3xl font-bold text-slate-900">{formattedPrice}</h3>
        <p className="text-sm text-slate-500 mt-2">Cicilan estimasi Rp 15jt/bulan</p>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      <div className="space-y-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-sm font-medium text-slate-900 mb-2">Pilih Jadwal Survey</p>
          <div className="flex gap-2 mb-4">
            {['Sen', 'Sel', 'Rab', 'Kam'].map((day, i) => (
              <button key={i} className={`flex-1 py-2 rounded-lg text-sm flex flex-col items-center justify-center transition-colors ${i === 0 ? 'bg-blue-700 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xs opacity-80">{day}</span>
                <span className="font-semibold">{12 + i}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
             <button className="py-2 border-2 border-blue-700 rounded-lg text-sm font-medium text-blue-700 bg-blue-50">10:00</button>
             <button className="py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">14:00</button>
          </div>
        </div>
        
        <Button size="lg" className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl h-14 text-base shadow-lg shadow-blue-700/20">
          <CalendarCheck className="w-5 h-5 mr-2" />
          Jadwalkan Survey Lokasi
        </Button>
      </div>
      
      <p className="text-xs text-center text-slate-500">
        Tidak dipungut biaya untuk survey lokasi.
      </p>
    </div>
  );
}
