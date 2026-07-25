'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle2, FileText, Activity, Droplets, Zap, ShieldCheck, Save } from 'lucide-react';

type SurveyFormValues = {
  atap: 'Baik' | 'Cukup' | 'Perlu Perbaikan';
  dinding: 'Baik' | 'Cukup' | 'Perlu Perbaikan';
  listrik: 'Baik' | 'Cukup' | 'Perlu Perbaikan';
  sanitasi: 'Baik' | 'Cukup' | 'Perlu Perbaikan';
  catatan?: string;
};

const OPTIONS = ['Baik', 'Cukup', 'Perlu Perbaikan'] as const;

// Menyesuaikan parameter checklist survei
const PARAMETERS = [
  { id: 'atap', label: 'Atap', icon: ShieldCheck },
  { id: 'dinding', label: 'Dinding', icon: Activity },
  { id: 'listrik', label: 'Listrik', icon: Zap },
  { id: 'sanitasi', label: 'Sanitasi', icon: Droplets },
] as const;

export default function SurveyorFormPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.propertyId as string;

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SurveyFormValues>({
    defaultValues: {
      atap: undefined,
      dinding: undefined,
      listrik: undefined,
      sanitasi: undefined,
      catatan: '',
    },
  });

  const onSubmit = async (data: SurveyFormValues) => {
    // Simulasi pemanggilan API
    console.log('Submitting survey report for property:', propertyId, data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Laporan Survei Fisik berhasil disubmit!');
    // Mengarahkan kembali ke daftar task setelah selesai
    // router.push('/surveyor/tasks'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header Halaman (Sticky) */}
      <div className="bg-white px-5 py-6 shadow-sm sticky top-0 z-10 flex items-center justify-between border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Survei Fisik</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">ID Properti: {propertyId || 'TBD'}</p>
        </div>
        <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
          <FileText className="text-blue-600 w-6 h-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-6">
        
        {/* Checklist Section */}
        <div className="space-y-6">
          {PARAMETERS.map((param) => {
            const Icon = param.icon;
            return (
              <div key={param.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{param.label}</h2>
                </div>
                
                <Controller
                  name={param.id}
                  control={control}
                  rules={{ required: `${param.label} wajib dinilai` }}
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      {OPTIONS.map((option) => {
                        const isSelected = field.value === option;
                        
                        // Menentukan gaya warna berdasarkan opsi
                        let colorClasses = 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300';
                        if (isSelected) {
                          if (option === 'Baik') colorClasses = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-sm ring-1 ring-emerald-500';
                          if (option === 'Cukup') colorClasses = 'border-amber-500 bg-amber-50 text-amber-800 font-semibold shadow-sm ring-1 ring-amber-500';
                          if (option === 'Perlu Perbaikan') colorClasses = 'border-rose-500 bg-rose-50 text-rose-800 font-semibold shadow-sm ring-1 ring-rose-500';
                        }

                        return (
                          <button
                            type="button"
                            key={option}
                            onClick={() => field.onChange(option)}
                            className={`w-full py-4 px-5 rounded-xl border-2 transition-all duration-200 text-left flex items-center justify-between ${colorClasses}`}
                          >
                            <span className="text-lg">{option}</span>
                            {isSelected && (
                              <CheckCircle2 className={`w-6 h-6 ${
                                option === 'Baik' ? 'text-emerald-600' :
                                option === 'Cukup' ? 'text-amber-600' :
                                'text-rose-600'
                              }`} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                
                {/* Pesan Error Validasi */}
                {errors[param.id] && (
                  <p className="text-rose-500 text-sm mt-3 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
                    {errors[param.id]?.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Catatan Tambahan */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Catatan Tambahan (Opsional)</h2>
          <Controller
            name="catatan"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-base focus:ring-0 focus:border-blue-500 transition-all outline-none resize-none"
                placeholder="Tuliskan detail temuan spesifik atau kendala di lapangan..."
              />
            )}
          />
        </div>

        {/* Floating Button "Submit Report" di bawah (Ergonomis untuk HP) */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-20">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/30 transition-all text-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan Data...
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                Submit Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
