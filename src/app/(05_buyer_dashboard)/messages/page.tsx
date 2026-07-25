import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pesan</h1>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari pesan..." className="pl-9 bg-white" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 bg-white cursor-pointer border-l-2 border-l-blue-600">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-900">Siti Aminah</h4>
                <span className="text-xs text-gray-500">10:45</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Halo Pak Budi, untuk jadwal kunjungan...</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-lg">Siti Aminah</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                <p>Siang Bu Siti, apakah bisa dijadwalkan kunjungan hari Minggu?</p>
                <span className="text-[10px] text-blue-100 mt-1 block text-right">10:40</span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                <p>Halo Pak Budi, untuk jadwal kunjungan di hari Minggu bisa di jam 10 pagi. Apakah bapak bersedia?</p>
                <span className="text-[10px] text-gray-500 mt-1 block">10:45</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input placeholder="Ketik pesan..." className="flex-1" />
              <Button size="icon"><Send className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
