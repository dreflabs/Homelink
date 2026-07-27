import { getTranslations } from 'next-intl/server';
import { getBanners, toggleBanner, deleteBanner } from "@/actions/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Power } from "lucide-react";
import Image from "next/image";

export default async function BannerPage() {
  const tTable = await getTranslations('Common.table');

  const banners = await getBanners();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        <Button><Plus className="w-4 h-4 mr-2" /> Add Banner</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Banners</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>{tTable('title')}</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>{tTable('status')}</TableHead>
                <TableHead className="text-right">{tTable('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="w-24 h-12 relative rounded overflow-hidden bg-gray-100">
                      <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell>{banner.position}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <form action={async () => { "use server"; await toggleBanner(banner.id); }}>
                      <Button variant="outline" size="icon" type="submit" title="Toggle Active">
                        <Power className={`w-4 h-4 ${banner.isActive ? 'text-green-500' : 'text-gray-400'}`} />
                      </Button>
                    </form>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                    <form action={async () => { "use server"; await deleteBanner(banner.id); }}>
                      <Button variant="ghost" size="icon" type="submit" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
              {banners.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    No banners found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
