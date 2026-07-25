"use server";

export async function getBuyerDashboard() {
  return {
    profile: {
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      phone: "+62 812-3456-7890",
      address: "Jl. Sudirman No. 123, Jakarta",
      avatar: "https://i.pravatar.cc/150?u=budi",
    },
    stats: {
      savedProperties: 12,
      scheduledVisits: 3,
      activeOffers: 1,
      unreadMessages: 5,
    },
    recentActivities: [
      { id: "1", title: "Jadwal Kunjungan Disetujui", description: "Kunjungan ke Villa Indah pada 28 Jul", date: "2026-07-25T10:00:00Z" },
      { id: "2", title: "Penawaran Terkirim", description: "Penawaran untuk Apartemen Senayan", date: "2026-07-24T15:30:00Z" },
    ]
  };
}

export async function getOwnerDashboard() {
  return {
    profile: {
      name: "Siti Aminah",
      email: "siti.aminah@example.com",
    },
    stats: {
      totalProperties: 5,
      activeListings: 4,
      totalViews: 1250,
      inquiries: 18,
    },
    performance: [
      { month: "Jan", views: 200 },
      { month: "Feb", views: 250 },
      { month: "Mar", views: 300 },
      { month: "Apr", views: 280 },
      { month: "May", views: 350 },
      { month: "Jun", views: 400 },
    ],
    recentActivities: [
      { id: "1", title: "Pesan Baru", description: "Dari Budi mengenai Villa Indah", date: "2026-07-25T09:00:00Z" },
      { id: "2", title: "Listing Disetujui", description: "Apartemen Senayan sekarang aktif", date: "2026-07-23T11:00:00Z" },
    ]
  };
}
