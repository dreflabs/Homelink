"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Percent, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";

export function MortgageCalculator({ defaultPrice = 1500000000 }: { defaultPrice?: number }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenorYears, setTenorYears] = useState(15);
  const [interestRatePercent, setInterestRatePercent] = useState(7.5);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      router.back();
    }
  };

  const { monthlyInstallment, totalInterest, totalPayment, downPaymentAmount } = useMemo(() => {
    const dpAmount = (downPaymentPercent / 100) * defaultPrice;
    const principal = defaultPrice - dpAmount;
    
    // Rumus anuitas: M = P * (r(1+r)^n) / ((1+r)^n - 1)
    const r = (interestRatePercent / 100) / 12;
    const n = tenorYears * 12;
    
    let monthly = 0;
    if (r === 0) {
      monthly = principal / n;
    } else {
      monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    
    const totalPay = (monthly * n) + dpAmount;
    const totalInt = (monthly * n) - principal;

    return {
      downPaymentAmount: dpAmount,
      monthlyInstallment: isNaN(monthly) ? 0 : monthly,
      totalInterest: isNaN(totalInt) ? 0 : totalInt,
      totalPayment: isNaN(totalPay) ? 0 : totalPay
    };
  }, [defaultPrice, downPaymentPercent, tenorYears, interestRatePercent]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl md:rounded-3xl p-0 overflow-hidden bg-white">
        <div className="p-6 md:p-8 space-y-8">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Calculator className="h-6 w-6 text-blue-700" />
              Simulasi KPR
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Estimasi cicilan bulanan berdasarkan harga properti {formatRupiah(defaultPrice)}. Ini adalah estimasi murni, bukan penawaran resmi dari bank.
            </DialogDescription>
          </DialogHeader>

          {/* Result Card */}
          <div className="bg-blue-700 rounded-2xl p-6 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex items-center gap-2 mb-2 text-blue-100">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Estimasi Cicilan Bulanan</span>
            </div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-6 transition-all duration-300">
              {formatRupiah(monthlyInstallment)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-600/50 text-sm">
              <div>
                <div className="text-blue-200 mb-1">Total Pembayaran</div>
                <div className="font-semibold">{formatRupiah(totalPayment)}</div>
              </div>
              <div>
                <div className="text-blue-200 mb-1">Total Bunga (Estimasi)</div>
                <div className="font-semibold">{formatRupiah(totalInterest)}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dp-slider" className="text-slate-900 font-semibold">Uang Muka (DP)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="dp-input"
                    type="number" 
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-16 text-right h-8"
                  />
                  <span className="text-sm text-slate-500">%</span>
                </div>
              </div>
              <Slider
                id="dp-slider"
                min={10}
                max={90}
                step={1}
                value={[downPaymentPercent]}
                onValueChange={(val) => setDownPaymentPercent(Array.isArray(val) ? val[0] : (val as any)[0] ?? val)}
                className="py-2"
              />
              <div className="text-sm text-slate-500 text-right">{formatRupiah(downPaymentAmount)}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="tenor-slider" className="text-slate-900 font-semibold">Tenor KPR (Tahun)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="tenor-input"
                    type="number" 
                    value={tenorYears}
                    onChange={(e) => setTenorYears(Number(e.target.value))}
                    className="w-16 text-right h-8"
                  />
                  <span className="text-sm text-slate-500">Thn</span>
                </div>
              </div>
              <Slider
                id="tenor-slider"
                min={1}
                max={30}
                step={1}
                value={[tenorYears]}
                onValueChange={(val) => setTenorYears(Array.isArray(val) ? val[0] : (val as any)[0] ?? val)}
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="interest-input" className="text-slate-900 font-semibold">Suku Bunga per Tahun</Label>
                <div className="flex items-center gap-2 relative">
                  <Input 
                    id="interest-input"
                    type="number" 
                    step="0.1"
                    value={interestRatePercent}
                    onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                    className="w-20 text-right pr-6 h-8"
                  />
                  <Percent className="h-3 w-3 absolute right-2 top-2.5 text-slate-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
