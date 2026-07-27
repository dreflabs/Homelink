"use client";


import { useTranslations } from 'next-intl';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";
import { createCoupon, deleteCoupon } from "@/actions/coupon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Coupon = {
  id: string;
  code: string;
  discount: any; // Decimal from Prisma
  type: string;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  validUntil: Date | null;
};

export function CouponClient({ initialCoupons }: { initialCoupons: Coupon[] }) {
  const tTable = useTranslations('Common.table');
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("PERCENTAGE");
  const [maxUses, setMaxUses] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newCoupon = await createCoupon({
        code,
        discount: parseFloat(discount),
        type,
        maxUses: maxUses ? parseInt(maxUses) : undefined,
      });
      setCoupons([newCoupon as any, ...coupons]);
      setIsOpen(false);
      
      // Reset form
      setCode("");
      setDiscount("");
      setType("PERCENTAGE");
      setMaxUses("");
    } catch (error) {
      console.error(error);
      alert("Failed to create coupon. Code might already exist.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await deleteCoupon(id);
      setCoupons(coupons.filter(c => c.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete coupon.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Coupons</h2>
        <Button onClick={() => setIsOpen(true)}><Plus className="w-4 h-4 mr-2"/> Add Coupon</Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input 
                  id="code" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  required 
                  placeholder="e.g. SUMMER2026"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <Select value={type} onValueChange={(value) => setType(value ?? "PERCENTAGE")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Value</Label>
                <Input 
                  id="discount" 
                  type="number" 
                  step="0.01" 
                  value={discount} 
                  onChange={(e) => setDiscount(e.target.value)} 
                  required 
                  placeholder={type === "PERCENTAGE" ? "20" : "50000"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxUses">Max Uses (Optional)</Label>
                <Input 
                  id="maxUses" 
                  type="number" 
                  value={maxUses} 
                  onChange={(e) => setMaxUses(e.target.value)} 
                  placeholder="Leave blank for unlimited"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Create Coupon"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>{tTable('status')}</TableHead>
              <TableHead className="text-right">{tTable('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No coupons found.
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-bold">{coupon.code}</TableCell>
                  <TableCell>
                    {coupon.type === "PERCENTAGE" 
                      ? `${coupon.discount}%` 
                      : `Rp ${Number(coupon.discount).toLocaleString("id-ID")}`}
                  </TableCell>
                  <TableCell>
                    {coupon.usedCount} {coupon.maxUses ? `/ ${coupon.maxUses}` : "uses"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={coupon.isActive ? "default" : "secondary"}>
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(coupon.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
