import { getStaticPages } from "@/actions/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function SeoSettingsPage() {
  const pages = await getStaticPages();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SEO Settings</h1>
        <Button>Save All Changes</Button>
      </div>

      <div className="grid gap-6">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <CardTitle>{page.title}</CardTitle>
              <CardDescription>/{page.slug}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`title-${page.id}`}>Meta Title</Label>
                <Input id={`title-${page.id}`} defaultValue={page.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`desc-${page.id}`}>Meta Description</Label>
                <Textarea 
                  id={`desc-${page.id}`} 
                  defaultValue={page.metaDescription || ""} 
                  placeholder="A brief description of this page for search engines..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        
        {pages.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No static pages available to configure SEO. Create some pages first.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
