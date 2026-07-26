import { getBanners } from "@/actions/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import Image from "next/image";

export default async function HomepageBuilderPage() {
  const banners = await getBanners();
  const activeBanners = banners.filter(b => b.isActive);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Homepage Builder</h1>
        <Button>Save Layout</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Sections</CardTitle>
          <CardDescription>Drag and drop to reorder active banners on the homepage.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeBanners.map((banner, index) => (
              <div 
                key={banner.id} 
                className="flex items-center gap-4 p-4 bg-gray-50 border rounded-lg"
              >
                <div className="cursor-grab text-gray-400 hover:text-gray-600">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="w-12 text-center text-sm font-medium text-gray-500">
                  #{index + 1}
                </div>
                <div className="w-24 h-12 relative rounded overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{banner.title}</h4>
                  <p className="text-xs text-muted-foreground">Position: {banner.position}</p>
                </div>
              </div>
            ))}
            
            {activeBanners.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No active banners available. Add and activate banners first.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Featured Properties Section</CardTitle>
          <CardDescription>Configure the featured properties section on the homepage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 border rounded-lg text-sm text-center text-gray-500">
            Automatically displays 8 most recent properties.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
