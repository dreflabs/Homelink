import { getTestimonials, publishTestimonial, deleteTestimonial } from "@/actions/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Button><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testi) => (
                <TableRow key={testi.id}>
                  <TableCell className="font-medium">{testi.authorName}</TableCell>
                  <TableCell>{testi.authorRole}</TableCell>
                  <TableCell>{'⭐'.repeat(testi.rating)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${testi.isPublished ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {testi.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <form action={async () => { "use server"; await publishTestimonial(testi.id); }}>
                      <Button variant="outline" size="icon" type="submit" title="Toggle Publish">
                        {testi.isPublished ? <Eye className="w-4 h-4 text-blue-500" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                      </Button>
                    </form>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                    <form action={async () => { "use server"; await deleteTestimonial(testi.id); }}>
                      <Button variant="ghost" size="icon" type="submit" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
              {testimonials.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    No testimonials found.
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
