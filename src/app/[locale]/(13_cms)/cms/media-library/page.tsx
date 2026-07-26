import { getMediaLibrary, deleteMedia } from "@/actions/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Upload, File } from "lucide-react";
import Image from "next/image";

export default async function MediaLibraryPage() {
  const media = await getMediaLibrary();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <Button><Upload className="w-4 h-4 mr-2" /> Upload Media</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.map((item) => (
          <Card key={item.id} className="overflow-hidden group relative">
            <CardContent className="p-0 aspect-square flex items-center justify-center bg-gray-100 relative">
              {item.fileType.startsWith("image/") ? (
                <Image src={item.url} alt={item.altText || "Media"} fill className="object-cover" />
              ) : (
                <File className="w-12 h-12 text-gray-400" />
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <form action={async () => {
                  "use server";
                  await deleteMedia(item.id);
                }}>
                  <Button variant="destructive" size="icon" type="submit">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
            <div className="p-2 text-xs truncate border-t text-muted-foreground">
              {item.altText || item.fileType}
            </div>
          </Card>
        ))}
        {media.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No media uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
