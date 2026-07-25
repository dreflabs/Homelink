import { getFAQs, toggleFAQ, deleteFAQ } from "@/actions/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Power } from "lucide-react";

export default async function FAQManagementPage() {
  const faqs = await getFAQs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">FAQ Management</h1>
        <Button><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">{faq.order}</TableCell>
                  <TableCell className="font-medium max-w-md truncate">{faq.question}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${faq.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {faq.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <form action={async () => { "use server"; await toggleFAQ(faq.id); }}>
                      <Button variant="outline" size="icon" type="submit" title="Toggle Active">
                        <Power className={`w-4 h-4 ${faq.isActive ? 'text-green-500' : 'text-gray-400'}`} />
                      </Button>
                    </form>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                    <form action={async () => { "use server"; await deleteFAQ(faq.id); }}>
                      <Button variant="ghost" size="icon" type="submit" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
              {faqs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                    No FAQs found.
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
