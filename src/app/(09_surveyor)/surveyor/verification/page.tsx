import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function VerificationPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Property Verification</h1>
      <Card>
        <CardHeader>
          <CardTitle>Verify Documents & Details</CardTitle>
          <CardDescription>Verify the property address and ownership details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Verified Address</Label>
              <Input id="address" placeholder="Enter verified address..." />
            </div>

            <div className="space-y-2">
              <Label>Certificate Verification</Label>
              <div className="flex items-center gap-4">
                <Input type="file" accept="application/pdf,image/*" />
                <Button variant="outline" type="button">Upload Certificate Copy</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Verification Status</Label>
              <select id="status" className="w-full p-2 border rounded-md bg-background text-foreground">
                <option>Verified</option>
                <option>Pending Additional Docs</option>
                <option>Rejected / Mismatch</option>
              </select>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button">Submit Verification</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
