import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule & Calendar</h1>
          <p className="text-gray-500">Manage internal appointments, property viewings, and meetings.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-4">
                <CardTitle className="text-lg">October 2023</CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8">Today</Button>
                <div className="border-l mx-1"></div>
                <Button variant="ghost" size="sm" className="h-8 bg-gray-100">Month</Button>
                <Button variant="ghost" size="sm" className="h-8">Week</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] border rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 flex-col">
                <CalendarIcon className="h-16 w-16 mb-4 text-gray-300" />
                <p>Full Calendar UI Placeholder</p>
                <p className="text-sm mt-2 max-w-sm text-center">In a complete implementation, this would use a library like react-big-calendar or fullcalendar.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex gap-4 p-3 border rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex flex-col items-center justify-center w-12 text-blue-600">
                  <span className="text-sm font-semibold">10:00</span>
                  <span className="text-xs text-gray-500">AM</span>
                </div>
                <div className="flex-1 border-l pl-4">
                  <h4 className="text-sm font-medium text-gray-900">Property Verification</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>Sudirman Suites #12A</span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    <Badge variant="outline" className="text-[10px] h-5 bg-blue-50 text-blue-700">Verification</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-3 border rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex flex-col items-center justify-center w-12 text-blue-600">
                  <span className="text-sm font-semibold">01:30</span>
                  <span className="text-xs text-gray-500">PM</span>
                </div>
                <div className="flex-1 border-l pl-4">
                  <h4 className="text-sm font-medium text-gray-900">Client Meeting</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>Pak Budi (Owner)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>30 mins (Virtual)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-3 border rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex flex-col items-center justify-center w-12 text-blue-600">
                  <span className="text-sm font-semibold">03:00</span>
                  <span className="text-xs text-gray-500">PM</span>
                </div>
                <div className="flex-1 border-l pl-4">
                  <h4 className="text-sm font-medium text-gray-900">Team Sync</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>Internal Team</span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    <Badge variant="outline" className="text-[10px] h-5 bg-purple-50 text-purple-700">Internal</Badge>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
