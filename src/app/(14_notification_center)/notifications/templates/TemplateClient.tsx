"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createNotificationTemplate, updateNotificationTemplate, deleteNotificationTemplate } from "@/actions/notification";
import { Plus, Edit, Trash2 } from "lucide-react";

type Template = {
  id: string;
  name: string;
  subject: string;
  bodyHtml: string;
  channel: string;
};

export default function TemplateClient({ initialTemplates }: { initialTemplates: Template[] }) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    bodyHtml: "",
    channel: "EMAIL"
  });

  const handleOpenDialog = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        subject: template.subject,
        bodyHtml: template.bodyHtml,
        channel: template.channel,
      });
    } else {
      setEditingTemplate(null);
      setFormData({ name: "", subject: "", bodyHtml: "", channel: "EMAIL" });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTemplate) {
      const res = await updateNotificationTemplate(editingTemplate.id, formData);
      if (res.success) {
        setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...t, ...formData } : t));
        setIsOpen(false);
      }
    } else {
      const res = await createNotificationTemplate(formData);
      if (res.success) {
        window.location.reload(); // naive reload to get the new id, or we could handle it better
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      const res = await deleteNotificationTemplate(id);
      if (res.success) {
        setTemplates(templates.filter(t => t.id !== id));
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Templates</h1>
          <p className="text-muted-foreground mt-2">Manage your email, SMS, and in-app templates.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4" onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add Template
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create Template'}</DialogTitle>
                <DialogDescription>
                  Configure the subject, body, and channel for this notification template.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. WELCOME_EMAIL" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select 
                    value={formData.channel} 
                    onValueChange={(val) => setFormData({...formData, channel: val ?? "EMAIL"})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMAIL">Email</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="IN_APP">In-App</SelectItem>
                      <SelectItem value="PUSH">Push</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Subject line" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bodyHtml">Body (HTML/Text)</Label>
                  <Textarea 
                    id="bodyHtml" 
                    value={formData.bodyHtml}
                    onChange={(e) => setFormData({...formData, bodyHtml: e.target.value})}
                    placeholder="Content goes here..." 
                    rows={5}
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Template</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Templates</CardTitle>
          <CardDescription>All notification templates available in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No templates configured.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">
                        {template.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.channel}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={template.subject}>
                        {template.subject}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleOpenDialog(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
