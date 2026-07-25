"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { UploadCloud, MapPin } from 'lucide-react';
import Link from 'next/link';
import { createProperty } from "@/lib/actions/property";

export default function NewPropertyPage() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Mock drop behavior
  };

  return (
    <form action={async (formData: FormData) => { await createProperty(formData); }} className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Add New Property</h1>
          <p className="text-slate-500 mt-2">Create a new listing by filling out the information below.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild className="rounded-full px-6">
            <Link href="/owner/properties">Cancel</Link>
          </Button>
          <Button type="submit" className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
            Save Listing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Section 1: Basic Details */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
              <CardTitle className="text-xl font-semibold text-slate-800">Basic Details</CardTitle>
              <CardDescription className="text-sm mt-1">Essential information about the property.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-slate-700 font-medium">Property Title</Label>
                <Input id="title" name="title" placeholder="e.g. Modern Apartment with Ocean View" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="price" className="text-slate-700 font-medium">Price (IDR)</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-500 font-medium">Rp</span>
                    <Input id="price" name="price" type="number" placeholder="0" className="pl-12 h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="propertyType" className="text-slate-700 font-medium">Property Type</Label>
                  <Select name="propertyType">
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-blue-500 text-base">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Describe the property's features, amenities, and unique selling points..." 
                  className="min-h-[140px] rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 resize-y text-base p-4" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Location */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
              <CardTitle className="text-xl font-semibold text-slate-800">Location</CardTitle>
              <CardDescription className="text-sm mt-1">Where is this property located?</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="address" className="text-slate-700 font-medium">Full Address</Label>
                <Input id="address" name="address" placeholder="123 Main Street" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="city" className="text-slate-700 font-medium">City</Label>
                  <Input id="city" name="city" placeholder="Jakarta Selatan" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="postalCode" className="text-slate-700 font-medium">Postal Code</Label>
                  <Input id="postalCode" name="postalCode" placeholder="12345" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 text-base" />
                </div>
              </div>
              
              <div className="h-56 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center">
                {/* Mock Map Placeholder */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-6.2088,106.8456&zoom=12&size=800x400&style=feature:all|element:labels|visibility:off')] bg-cover bg-center" />
                <div className="z-10 flex flex-col items-center justify-center p-5 bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-slate-200/50 transition-transform hover:scale-105 cursor-pointer">
                  <MapPin className="h-7 w-7 text-blue-500 mb-2" />
                  <span className="text-sm font-semibold text-slate-700">Pin location on map</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Media Upload */}
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-6 pt-8 px-8">
              <CardTitle className="text-xl font-semibold text-slate-800">Media</CardTitle>
              <CardDescription className="text-sm mt-1">Upload high-quality photos of your property.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div 
                className={`relative flex flex-col items-center justify-center w-full min-h-[280px] rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out ${
                  dragActive ? 'border-blue-500 bg-blue-50/60 scale-[1.02]' : 'border-slate-300 bg-slate-50/50 hover:bg-slate-100/50 hover:border-blue-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
                  <div className={`w-20 h-20 mb-6 rounded-full flex items-center justify-center transition-colors duration-300 ${dragActive ? 'bg-blue-200/50 text-blue-700' : 'bg-slate-200/50 text-slate-500'}`}>
                    <UploadCloud className="h-10 w-10" />
                  </div>
                  <p className="mb-2 text-base text-slate-700">
                    <span className="font-semibold text-blue-600 pointer-events-auto cursor-pointer hover:underline">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-slate-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  name="images"
                  multiple 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title="Upload images"
                />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200/50 rounded-3xl bg-white/50 backdrop-blur-xl sticky top-8">
            <CardHeader className="pb-4 pt-6 px-6">
              <CardTitle className="text-lg font-semibold text-slate-800">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  Draft
                </span>
              </div>
              <div className="space-y-2 pt-2">
                <p className="text-sm text-slate-500 leading-relaxed">Ensure all details are correct before publishing your listing. A well-detailed listing attracts more buyers.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 px-6 pb-6 pt-4">
              <Button type="submit" name="action" value="publish" className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all h-12 text-base font-medium">
                Publish Listing
              </Button>
              <Button type="submit" name="action" value="draft" variant="outline" className="w-full rounded-xl h-12 text-slate-700 border-slate-300 hover:bg-slate-100 text-base font-medium">
                Save as Draft
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </form>
  );
}
