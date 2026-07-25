"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, CloudRain, Sun, Cloud, Upload, Camera } from "lucide-react";

// Mock data for photographer assignments
const assignments = [
  {
    id: "A-1001",
    address: "Jl. Sudirman No. 45, Jakarta Pusat",
    deadline: "2026-07-26",
    weather: "Cerah",
    status: "Pending",
  },
  {
    id: "A-1002",
    address: "Perumahan Hijau Daun Blok B/12, Bandung",
    deadline: "2026-07-27",
    weather: "Hujan Ringan",
    status: "Pending",
  },
  {
    id: "A-1003",
    address: "Apartemen Skyview Tower C, Lt. 15",
    deadline: "2026-07-28",
    weather: "Berawan",
    status: "Pending",
  },
];

const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case "Cerah":
      return <Sun className="h-4 w-4 text-orange-500 mr-2" />;
    case "Hujan Ringan":
      return <CloudRain className="h-4 w-4 text-blue-500 mr-2" />;
    case "Berawan":
      return <Cloud className="h-4 w-4 text-gray-500 mr-2" />;
    default:
      return <Cloud className="h-4 w-4 text-gray-500 mr-2" />;
  }
};

export default function PhotographerAssignmentsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Penugasan Fotografi</h1>
          <p className="text-slate-500 mt-1">Daftar lokasi properti yang perlu didokumentasikan.</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Camera className="w-5 h-5 mr-2 text-blue-600" />
            Jadwal Pemotretan
          </CardTitle>
          <CardDescription>
            Terdapat {assignments.length} penugasan yang menunggu untuk diselesaikan.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Alamat Properti</TableHead>
                  <TableHead className="font-semibold text-slate-700">Tenggat Waktu</TableHead>
                  <TableHead className="font-semibold text-slate-700">Prediksi Cuaca</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id} className="group hover:bg-slate-50/80 transition-colors">
                    <TableCell className="font-medium text-slate-600">{assignment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-slate-900 font-medium">
                        <MapPin className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                        {assignment.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-slate-600">
                        <Calendar className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                        {assignment.deadline}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-slate-700 font-medium">
                        {getWeatherIcon(assignment.weather)}
                        {assignment.weather}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200 group-hover:shadow-md"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Media
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
