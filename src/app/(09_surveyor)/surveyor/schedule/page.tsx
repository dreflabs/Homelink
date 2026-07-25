import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SchedulePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Survey Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Surveys</CardTitle>
            <CardDescription>Your schedule for the next 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Jl. Sudirman No. 1</h3>
                  <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
                <Button size="sm">Details</Button>
              </div>
              <div className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Jl. Thamrin No. 2</h3>
                  <p className="text-sm text-muted-foreground">Friday, 14:00 PM</p>
                </div>
                <Button size="sm">Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 border rounded-md bg-muted/50 text-muted-foreground">
              [Calendar Component Placeholder]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
