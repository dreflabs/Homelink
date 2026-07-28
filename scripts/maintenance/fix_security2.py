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
    content = content.replace("enum Role {\n  ADMIN\n  SUPER_ADMIN\n  BUYER\n  OWNER\n  SURVEYOR\n}", "enum Role {\n  ADMIN\n  SUPER_ADMIN\n  BUYER\n  OWNER\n  SURVEYOR\n}\n" + enums)

# 2. Fix Property status
prop_match = re.search(r'(model Property \{.*?\})(.*?)', content, re.DOTALL)
if prop_match:
    prop_body = prop_match.group(1)
    new_prop_body = prop_body.replace('status      String   @default("DRAFT")', 'status      PropertyStatus @default(DRAFT)')
    content = content.replace(prop_body, new_prop_body)

# 3. Fix Booking
booking_fixes = """  status      BookingStatus @default(PENDING)
  bookingPrice Decimal?
  updatedAt   DateTime @updatedAt"""

book_match = re.search(r'(model Booking \{.*?\})', content, re.DOTALL)
if book_match:
    book_body = book_match.group(1)
    new_book_body = book_body.replace('status      String   @default("PENDING")', booking_fixes)
    content = content.replace(book_body, new_book_body)

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

cu_match = re.search(r'(model CouponUsage \{.*?\})', content, re.DOTALL)
if cu_match:
    cu_body = cu_match.group(1)
    content = content.replace(cu_body, 'model CouponUsage {\n' + coupon_usage_fixes + '\n}')

# Add CouponUsage relation to Invoice
if "couponUsages CouponUsage[]" not in content:
    content = content.replace('  subscriptionId String?', '  subscriptionId String?\n  couponUsages   CouponUsage[]')


with open('prisma/schema.prisma', 'w') as f:
    f.write(content)

print("Security fixes applied successfully!")
