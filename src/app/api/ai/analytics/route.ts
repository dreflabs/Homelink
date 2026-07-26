import { NextResponse } from 'next/server';

export async function GET() {
  // STUB: Here is where you would connect to OpenAI / Anthropic / Vector DB APIs to get actual stats.
  // For now, we mock the real-time analytics data so the frontend logic is complete.
  
  const data = {
    stats: [
      {
        title: "Total Token Digunakan",
        value: "842,509",
        change: "+12.5%",
        isPositive: true,
      },
      {
        title: "Rata-rata Waktu Respon",
        value: "1.2s",
        change: "-0.3s",
        isPositive: true,
      },
      {
        title: "Akurasi Prediksi Harga",
        value: "94.8%",
        change: "+2.1%",
        isPositive: true,
      },
      {
        title: "Beban Server AI",
        value: "42%",
        change: "+5%",
        isPositive: false,
      }
    ],
    chartHeights: [40, 60, 45, 80, 55, 90, 75, 100, 65, 85, 50, 70]
  };

  return NextResponse.json(data);
}
