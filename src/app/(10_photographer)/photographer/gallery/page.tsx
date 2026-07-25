import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Film, Download, Trash2, Eye } from "lucide-react";

// Mock premium gallery data
const mockMedia = [
  { id: "1", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop", fileType: "image/jpeg", altText: "Ruang Tamu Modern", createdAt: "2026-07-20", property: "Vila Indah Kemang" },
  { id: "2", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop", fileType: "image/jpeg", altText: "Dapur Premium", createdAt: "2026-07-20", property: "Vila Indah Kemang" },
  { id: "3", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&auto=format&fit=crop", fileType: "image/jpeg", altText: "Kamar Tidur Utama", createdAt: "2026-07-21", property: "Apartemen Sudirman" },
  { id: "4", url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&auto=format&fit=crop", fileType: "image/jpeg", altText: "Kamar Mandi", createdAt: "2026-07-21", property: "Apartemen Sudirman" },
  { id: "5", url: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&auto=format&fit=crop", fileType: "video/mp4", altText: "Tour Video", createdAt: "2026-07-22", property: "Rumah Modern Bintaro" },
  { id: "6", url: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&auto=format&fit=crop", fileType: "image/jpeg", altText: "Taman Belakang", createdAt: "2026-07-22", property: "Rumah Modern Bintaro" },
  { id: "7", url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&auto=format&fit=crop", fileType: "image/jpeg", altText: "Tampak Depan", createdAt: "2026-07-23", property: "Villa Mediterania" },
  { id: "8", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop", fileType: "image/jpeg", altText: "Kolam Renang", createdAt: "2026-07-23", property: "Villa Mediterania" },
];

export default function GalleryPage() {
  const totalImages = mockMedia.filter((m) => m.fileType.startsWith("image/")).length;
  const totalVideos = mockMedia.filter((m) => m.fileType.startsWith("video/")).length;

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Galeri Media</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Semua foto dan video yang telah Anda unggah.
          </p>
        </div>
        <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white gap-2" asChild>
          <a href="/photographer/upload-media">
            <ImageIcon className="w-4 h-4" />
            Upload Baru
          </a>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Media", value: mockMedia.length, icon: ImageIcon, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Foto", value: totalImages, icon: ImageIcon, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Video", value: totalVideos, icon: Film, color: "text-violet-600", bg: "bg-violet-50" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-slate-100 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gallery Grid */}
      <Card className="rounded-2xl border-slate-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Semua Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockMedia.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 hover:shadow-md transition-shadow"
              >
                {item.fileType.startsWith("video/") ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-white gap-2">
                    <Film className="w-10 h-10 opacity-60" strokeWidth={1.5} />
                    <span className="text-xs font-medium opacity-80">Video</span>
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.url}
                    alt={item.altText || "Media"}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/50 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white">
                    <Eye className="w-4 h-4 text-slate-700" />
                  </Button>
                  <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white">
                    <Download className="w-4 h-4 text-slate-700" />
                  </Button>
                  <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs rounded-full px-2 py-0.5 ${
                      item.fileType.startsWith("video/")
                        ? "bg-violet-100 text-violet-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {item.fileType.startsWith("video/") ? "Video" : "Foto"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Caption info */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockMedia.map((item) => (
              <div key={`info-${item.id}`} className="px-1">
                <p className="text-xs font-medium text-slate-700 truncate">{item.altText}</p>
                <p className="text-xs text-slate-400">{item.property}</p>
                <p className="text-xs text-slate-400">{item.createdAt}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
