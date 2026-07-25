import { getBackupSnapshots } from "@/actions/super-admin";
import { BackupClient } from "./BackupClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, HardDrive, CheckCircle2 } from "lucide-react";

export default async function BackupPage() {
  const snapshots = await getBackupSnapshots();

  return (
    <div className="space-y-6">
      <BackupClient />

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Snapshot Archives</CardTitle>
          <CardDescription>Automated daily backups stored in S3 encrypted vault</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold text-gray-600">Snapshot File</TableHead>
                  <TableHead className="font-semibold text-gray-600">Size</TableHead>
                  <TableHead className="font-semibold text-gray-600">Created At</TableHead>
                  <TableHead className="font-semibold text-gray-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snapshots.map((snap) => (
                  <TableRow key={snap.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900 font-mono text-xs">{snap.filename}</TableCell>
                    <TableCell className="text-gray-600 text-sm">{snap.size}</TableCell>
                    <TableCell className="text-gray-600 text-sm">{snap.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 text-xs">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {snap.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
