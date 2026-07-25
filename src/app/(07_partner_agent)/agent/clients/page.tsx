import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Phone, Calendar } from "lucide-react";

export default function AgentClientsPage() {
  const clients = [
    { id: 1, name: "Budi Santoso", status: "Hot Lead", property: "Grand Kemang Residence", date: "24 Jul 2026", phone: "0812345678" },
    { id: 2, name: "Siti Rahma", status: "Cold Lead", property: "Apartemen Sudirman Suites", date: "20 Jul 2026", phone: "0812998877" },
    { id: 3, name: "Kevin Wijaya", status: "Hot Lead", property: "Pondok Indah Mansion", date: "23 Jul 2026", phone: "0813445566" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Klien</h1>
          <p className="text-slate-500 mt-1">Pantau prospek dan pipeline penjualan Anda.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari klien..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm border-slate-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-semibold">Nama Klien</TableHead>
              <TableHead className="font-semibold">Status Lead</TableHead>
              <TableHead className="font-semibold">Properti Incaran</TableHead>
              <TableHead className="font-semibold">Kontak Terakhir</TableHead>
              <TableHead className="text-right font-semibold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {client.name.charAt(0)}
                    </div>
                    {client.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    client.status === "Hot Lead" 
                      ? "bg-red-50 text-red-700 border-red-200" 
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">{client.property}</TableCell>
                <TableCell className="text-slate-600">{client.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
