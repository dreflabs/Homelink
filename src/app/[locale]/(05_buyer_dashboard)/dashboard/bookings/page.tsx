"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, UserRound, ShieldCheck } from "lucide-react";

import { getBuyerBookings } from "@/actions/dashboard";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function BookingsPage() {
  const t = useTranslations("BuyerDashboard");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getBuyerBookings()
      .then((data) => {
        if (isMounted) {
          setBookings(data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCancel = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b));
    // TODO: Connect handleCancel to backend action
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">{t("bookings.status.pending")}</Badge>;
      case "CONFIRMED":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">{t("bookings.status.confirmed")}</Badge>;
      case "COMPLETED":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">{t("bookings.status.completed")}</Badge>;
      case "CANCELLED":
        return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 border-rose-200">{t("bookings.status.cancelled")}</Badge>;
      default:
        return <Badge>{t("bookings.status.unknown")}</Badge>;
    }
  };

  const pendingBookings = bookings.filter(b => b.status === "PENDING");
  const historyBookings = bookings.filter(b => b.status !== "PENDING");

  const renderBookingCard = (booking: any) => (
    <Card key={booking.id} className="overflow-hidden mb-4 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0">
          <img 
            src={booking.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
            alt={booking.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            {getStatusBadge(booking.status)}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-1">
                  {t("bookings.card.id")}: {booking.id}
                </p>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                  {booking.title}
                </h3>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-5 h-5 mr-2  shrink-0" />
                <span className="truncate">{booking.address}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                <span>{new Date(booking.surveyDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="w-5 h-5 mr-2  shrink-0" />
                <span>{booking.timeSlot}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <UserRound className="w-5 h-5 mr-2  shrink-0" />
                <span>{t("bookings.card.agent")}: <span className="font-medium text-gray-900">{booking.agentName || t("bookings.card.defaultAgent")}</span></span>
              </div>
            </div>
          </div>
          
          {/* Action Section */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <Button variant="outline" className="text-gray-700 rounded-xl" onClick={() => alert(t("bookings.card.chatNotAvailable"))}>
              {t("bookings.card.contactAgent")}
            </Button>
            
            {booking.status === "PENDING" && (
              <Button 
                variant="destructive" 
                className="rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border-none shadow-none"
                onClick={() => {
                  if (confirm(t("bookings.card.cancelPrompt"))) {
                    handleCancel(booking.id);
                  }
                }}
              >
                {t("bookings.card.cancelBooking")}
              </Button>
            )}
            
            {booking.status === "COMPLETED" && (
              <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800">
                <ShieldCheck className="w-5 h-5 mr-2" />
                {t("bookings.card.review")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t("bookings.title")}</h1>
        <p className="text-gray-500 mt-2">{t("bookings.subtitle")}</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6 p-1 bg-gray-100/80 rounded-xl inline-flex">
          <TabsTrigger value="pending" className="rounded-lg px-6 py-2.5 transition-all">
            {t("bookings.tabs.active")} ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg px-6 py-2.5 transition-all">
            {t("bookings.tabs.history")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-0 focus-visible:outline-none">
          {pendingBookings.length > 0 ? (
            <div className="space-y-4">
              {pendingBookings.map(renderBookingCard)}
            </div>
          ) : (
            <div className="text-center py-16 px-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{t("bookings.emptyActive.title")}</h3>
              <p className="text-gray-500 max-w-sm mx-auto">{t("bookings.emptyActive.subtitle")}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="mt-0 focus-visible:outline-none">
          {historyBookings.length > 0 ? (
            <div className="space-y-4">
              {historyBookings.map(renderBookingCard)}
            </div>
          ) : (
            <div className="text-center py-16 px-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Clock className="w-8 h-8 " />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{t("bookings.emptyHistory.title")}</h3>
              <p className="text-gray-500">{t("bookings.emptyHistory.subtitle")}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
