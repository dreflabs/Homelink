'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarCheck, MessageCircle, ShieldCheck, Calculator } from 'lucide-react';
import { submitLead, submitBooking } from '@/actions/property';
import { MortgageCalculator } from '@/components/shared/property/MortgageCalculator';

export function InteractiveStickyBookingPanel({ propertyId, price }: { propertyId: string, price: number }) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'contact'>('schedule');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  const estimatedInstallment = useMemo(() => {
    const dpAmount = 0.2 * price;
    const principal = price - dpAmount;
    const r = (7.5 / 100) / 12;
    const n = 15 * 12;
    const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(monthly);
  }, [price]);

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(price);

  const handleSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    
    const formData = new FormData(e.currentTarget);
    formData.append('propertyId', propertyId);
    
    try {
      const surveyDateString = formData.get('date') as string;
      const res = await submitBooking({
        propertyId,
        surveyDate: surveyDateString ? new Date(surveyDateString) : new Date(),
        timeSlot: "TBD",
      });
      if (res.success) setSuccess('Jadwal survey berhasil diajukan!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    
    try {
      const res = await submitLead({
        propertyId,
        interactionType: "MESSAGE",
      });
      if (res.success) setSuccess('Pesan berhasil dikirim. Agen akan segera menghubungi Anda.');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-card border border-slate-100 p-6 flex flex-col gap-6">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">Harga Mulai</p>
        <h3 className="text-3xl font-bold text-slate-900">{formattedPrice}</h3>
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowCalculator(true)}
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 group cursor-pointer transition-colors"
          >
            <Calculator className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
            <span>Cicilan estimasi {estimatedInstallment}/bulan</span>
          </button>
          <button
            type="button"
            onClick={() => setShowCalculator(true)}
            className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors cursor-pointer"
          >
            Simulasi KPR
          </button>
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full" />
      
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'schedule' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => { setActiveTab('schedule'); setSuccess(''); }}
        >
          Jadwal Survey
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'contact' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => { setActiveTab('contact'); setSuccess(''); }}
        >
          Hubungi Agen
        </button>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="text-sm font-medium leading-relaxed">{success}</p>
        </div>
      ) : activeTab === 'schedule' ? (
        <form onSubmit={handleSchedule} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-700 block mb-1">Nama Lengkap</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Masukkan nama Anda" />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-slate-700 block mb-1">Nomor WhatsApp</label>
              <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="08xx xxxx xxxx" />
            </div>
            <div>
              <label htmlFor="date" className="text-sm font-medium text-slate-700 block mb-1">Pilih Tanggal Survey</label>
              <input type="date" id="date" name="date" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>
          
          <Button type="submit" disabled={loading} size="lg" className="w-full bg-primary hover:bg-primary text-white rounded-xl h-14 text-base shadow-lg shadow-blue-700/20">
            <CalendarCheck className="w-5 h-5 mr-2" />
            {loading ? 'Memproses...' : 'Jadwalkan Survey Lokasi'}
          </Button>
          <p className="text-xs text-center text-slate-500">
            Tidak dipungut biaya untuk survey lokasi.
          </p>
        </form>
      ) : (
        <form onSubmit={handleContact} className="space-y-4">
           <div className="space-y-3">
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium text-slate-700 block mb-1">Nama Lengkap</label>
              <input type="text" id="contact-name" name="name" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Masukkan nama Anda" />
            </div>
            <div>
              <label htmlFor="contact-phone" className="text-sm font-medium text-slate-700 block mb-1">Nomor WhatsApp</label>
              <input type="tel" id="contact-phone" name="phone" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="08xx xxxx xxxx" />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-slate-700 block mb-1">Pesan</label>
              <textarea id="message" name="message" rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Halo, saya tertarik dengan properti ini..." defaultValue="Halo, saya tertarik dengan properti ini. Apakah masih tersedia?" />
            </div>
          </div>
          
          <Button type="submit" disabled={loading} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-14 text-base shadow-lg shadow-emerald-600/20">
            <MessageCircle className="w-5 h-5 mr-2" />
            {loading ? 'Mengirim...' : 'Kirim Pesan via Sistem'}
          </Button>
        </form>
      )}

      {showCalculator && (
        <MortgageCalculator
          price={price}
          isOpen={showCalculator}
          onClose={() => setShowCalculator(false)}
        />
      )}
    </div>
  );
}
