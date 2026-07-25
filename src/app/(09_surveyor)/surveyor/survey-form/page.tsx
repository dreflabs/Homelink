import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SurveyFormPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Property Condition Survey Form</h1>
      <Card>
        <CardHeader>
          <CardTitle>Survey Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyId">Property ID</Label>
                <Input id="propertyId" placeholder="e.g. PROP-12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Survey Date</Label>
                <Input id="date" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">General Condition</Label>
              <select id="condition" className="w-full p-2 border rounded-md bg-background text-foreground">
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Needs Repair</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Condition Notes / Remarks</Label>
              <Textarea id="notes" placeholder="Describe the current condition of the property..." className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repair">Suggested Repairs</Label>
              <Textarea id="repair" placeholder="List any repairs needed..." />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button">Submit Survey Report</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
