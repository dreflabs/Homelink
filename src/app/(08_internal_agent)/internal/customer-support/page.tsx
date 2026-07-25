import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MessageSquare, Clock, AlertCircle } from 'lucide-react';

const mockTickets = [
  {
    id: "TKT-1049",
    user: "Budi Santoso",
    subject: "Issue with property deposit",
    status: "open",
    priority: "high",
    lastUpdated: "10 mins ago",
    category: "Payment"
  },
  {
    id: "TKT-1048",
    user: "Siti Rahma",
    subject: "Cannot upload property photos",
    status: "in-progress",
    priority: "medium",
    lastUpdated: "2 hours ago",
    category: "Technical"
  },
  {
    id: "TKT-1047",
    user: "Andi Wijaya",
    subject: "Change phone number",
    status: "closed",
    priority: "low",
    lastUpdated: "1 day ago",
    category: "Account"
  }
];

export default function CustomerSupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Support</h1>
          <p className="text-gray-500">Manage user tickets and inquiries.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tickets</p>
                <h3 className="text-2xl font-bold mt-1">1,248</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Open</p>
                <h3 className="text-2xl font-bold mt-1">42</h3>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <h3 className="text-2xl font-bold mt-1">18</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Response</p>
                <h3 className="text-2xl font-bold mt-1">2h 15m</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Recent Tickets</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-9 w-[250px] h-9"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticket ID</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Last Updated</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-blue-600">{ticket.id}</td>
                    <td className="px-4 py-3">{ticket.user}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{ticket.subject}</td>
                    <td className="px-4 py-3 text-gray-500">{ticket.category}</td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        ticket.priority === 'high' ? 'destructive' :
                        ticket.priority === 'medium' ? 'default' : 'secondary'
                      } className={
                        ticket.priority === 'high' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                        ticket.priority === 'medium' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' :
                        'bg-gray-100 text-gray-700 hover:bg-gray-100'
                      }>
                        {ticket.priority.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        ticket.status === 'open' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                        ticket.status === 'in-progress' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                        'border-green-200 text-green-700 bg-green-50'
                      }>
                        {ticket.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{ticket.lastUpdated}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
