import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Film, Download, Trash2, Eye } from "lucide-react";
import { getMediaLibrary } from "@/actions/photographer";
import Link from "next/link";

export default async function GalleryPage() {
  const mediaItems = await getMediaLibrary();
  const totalImages = mediaItems.filter((m) => m.fileType.startsWith("image")).length;
  const totalVideos = mediaItems.filter((m) => m.fileType.startsWith("video")).length;

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
          <Link href="/photographer/upload-media">
            <ImageIcon className="w-4 h-4" />
            Upload Baru
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Media", value: mediaItems.length, icon: ImageIcon, color: "text-indigo-600", bg: "bg-indigo-50" },
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
          {mediaItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada media yang diunggah.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    {item.fileType.startsWith("video") ? (
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
                      <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white" asChild>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <Eye className="w-4 h-4 text-slate-700" />
                        </a>
                      </Button>
                      <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white" asChild>
                        <a href={item.url} download>
                          <Download className="w-4 h-4 text-slate-700" />
                        </a>
                      </Button>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs rounded-full px-2 py-0.5 ${
                          item.fileType.startsWith("video")
                            ? "bg-violet-100 text-violet-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {item.fileType.startsWith("video") ? "Video" : "Foto"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Caption info */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaItems.map((item) => (
                  <div key={`info-${item.id}`} className="px-1">
                    <p className="text-xs font-medium text-slate-700 truncate">{item.altText || "Tanpa Judul"}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
