import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, ShieldCheck, Clock, CalendarDays } from "lucide-react";

export default function SurveyorDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Dashboard Surveyor
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Pantau tugas survei Anda hari ini dan rute lokasi selanjutnya.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Tugas Hari Ini
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              2 lokasi baru ditambahkan
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Selesai
            </CardTitle>
            <ShieldCheck className="h-5 w-5  dark:" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +1 dari jam sebelumnya
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Tertunda
            </CardTitle>
            <Clock className="h-5 w-5  dark:" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Harus diselesaikan sebelum 17:00
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <Map className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Peta Lokasi Selanjutnya
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-12 text-center h-[400px] border-2 border-dashed border-slate-200 rounded-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  <Map className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Integrasi Peta Interaktif
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm text-center">
                  Tampilan peta akan dimuat di sini menggunakan layanan Maps API untuk memandu rute surveyor.
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
