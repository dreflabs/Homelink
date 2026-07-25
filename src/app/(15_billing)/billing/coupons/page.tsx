import { getCoupons } from "@/actions/coupon";
import { CouponClient } from "./coupon-client";

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coupons & Vouchers</h1>
        <p className="text-muted-foreground">
          Manage promotional coupons for users. (Admin Only)
        </p>
      </div>

      <CouponClient initialCoupons={coupons as any} />
    </div>
  );
}
