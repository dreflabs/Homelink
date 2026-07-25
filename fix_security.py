import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

# 1. Add Enums
enums = """
enum PropertyStatus {
  DRAFT
  PENDING_REVIEW
  PUBLISHED
  REJECTED
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}
"""

if "enum PropertyStatus" not in content:
    # insert after enum Role if exists, or just after generator
    if "enum Role" in content:
        content = content.replace("enum Role {\n  ADMIN\n  SUPER_ADMIN\n  BUYER\n  OWNER\n  SURVEYOR\n}", "enum Role {\n  ADMIN\n  SUPER_ADMIN\n  BUYER\n  OWNER\n  SURVEYOR\n}\n" + enums)

# 2. Fix Property status
content = re.sub(r'status\s+String\s+@default\("DRAFT"\)', 'status PropertyStatus @default(DRAFT)', content)
# if there is another default
content = re.sub(r'status\s+String\s+@default\(.*?\)', 'status PropertyStatus @default(DRAFT)', content)

# 3. Fix Booking
booking_fixes = """  status      BookingStatus @default(PENDING)
  bookingPrice Decimal?
  updatedAt   DateTime @updatedAt"""

# Find model Booking
booking_match = re.search(r'(model Booking \{.*?)status\s+String\s+@default\("PENDING"\)(.*?\})', content, re.DOTALL)
if booking_match:
    content = content.replace('status      String   @default("PENDING")', booking_fixes)
    # in case it was formatted differently:
    content = re.sub(r'status\s+String\s+@default\("PENDING"\)', booking_fixes, content)

# 4. Fix CouponUsage
coupon_usage_fixes = """  id        String   @id @default(uuid())
  couponId  String
  userId    String
  invoiceId String?
  discountApplied Decimal?
  usedAt    DateTime @default(now())

  coupon    Coupon   @relation(fields: [couponId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  invoice   Invoice? @relation(fields: [invoiceId], references: [id])

  @@index([couponId])
  @@index([userId])
  @@index([invoiceId])
  @@unique([couponId, userId])"""

content = re.sub(r'model CouponUsage \{.*?\}', 'model CouponUsage {\n' + coupon_usage_fixes + '\n}', content, flags=re.DOTALL)

# Add CouponUsage relation to Invoice
if "couponUsages CouponUsage[]" not in content:
    content = content.replace('  subscriptionId String?', '  subscriptionId String?\n  couponUsages   CouponUsage[]')


with open('prisma/schema.prisma', 'w') as f:
    f.write(content)

print("Security fixes applied successfully!")
