import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { getTickets } from '@/actions/internal';
import { formatDistanceToNow } from 'date-fns';

export default async function CustomerSupportPage() {
  const tickets = await getTickets();

  const openCount = tickets.filter(t => t.status === 'OPEN').length;
  const inProgressCount = tickets.filter(t => t.status === 'IN_PROGRESS').length;

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
                <h3 className="text-2xl font-bold mt-1">{tickets.length}</h3>
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
                <h3 className="text-2xl font-bold mt-1">{openCount}</h3>
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
                <h3 className="text-2xl font-bold mt-1">{inProgressCount}</h3>
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
                <h3 className="text-2xl font-bold mt-1">N/A</h3>
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
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-blue-600">{ticket.id.substring(0, 8)}</td>
                    <td className="px-4 py-3">{ticket.user?.name || 'Unknown User'}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{ticket.subject}</td>
                    <td className="px-4 py-3 text-gray-500">{ticket.category}</td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        ticket.priority === 'HIGH' ? 'destructive' :
                        ticket.priority === 'MEDIUM' ? 'default' : 'secondary'
                      } className={
                        ticket.priority === 'HIGH' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                        ticket.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' :
                        'bg-gray-100 text-gray-700 hover:bg-gray-100'
                      }>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        ticket.status === 'OPEN' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                        ticket.status === 'IN_PROGRESS' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                        'border-green-200 text-green-700 bg-green-50'
                      }>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
