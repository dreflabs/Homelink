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
        <p className="text-sm text-primary font-medium mt-2">
          Cicilan estimasi {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price * 0.8 * ((0.075 / 12) * Math.pow(1 + 0.075 / 12, 180)) / (Math.pow(1 + 0.075 / 12, 180) - 1))}/bulan
        </p>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      <div className="space-y-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-sm font-medium text-slate-900 mb-2">Pilih Jadwal Survey</p>
          <div className="flex gap-2 mb-4">
            {['Sen', 'Sel', 'Rab', 'Kam'].map((day, i) => (
              <button key={i} type="button" className={`flex-1 py-2.5 px-3 min-h-[44px] rounded-xl text-sm font-medium flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${i === 0 ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xs opacity-80">{day}</span>
                <span className="font-semibold">{12 + i}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
             <button type="button" className="py-2.5 px-3 min-h-[44px] rounded-xl text-sm font-medium transition-all active:scale-95 cursor-pointer border-2 border-primary text-primary bg-primary/5">10:00</button>
             <button type="button" className="py-2.5 px-3 min-h-[44px] rounded-xl text-sm font-medium transition-all active:scale-95 cursor-pointer border border-slate-200 text-slate-700 bg-white hover:bg-slate-50">14:00</button>
          </div>
        </div>
        
        <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-14 text-base shadow-lg shadow-primary/20">
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
