import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

# 1. Add userAgent to AuditLog
content = content.replace('ipAddress  String?', 'ipAddress  String?\n  userAgent  String?')

# 2. Add CouponUsage relation to User
content = content.replace('  invoices           Invoice[]\n  mediaUploads       Media[]       @relation("MediaUploader")', '  invoices           Invoice[]\n  mediaUploads       Media[]       @relation("MediaUploader")\n  couponUsages       CouponUsage[]')

# 3. Add CouponUsage relation to Coupon
content = content.replace('  updatedAt   DateTime @updatedAt\n}', '  updatedAt   DateTime @updatedAt\n\n  usages      CouponUsage[]\n}')

# 4. Add CouponUsage model at the end
coupon_usage_model = """
model CouponUsage {
  id        String   @id @default(uuid())
  couponId  String
  userId    String
  usedAt    DateTime @default(now())

  coupon    Coupon   @relation(fields: [couponId], references: [id])
  user      User     @relation(fields: [userId], references: [id])

  @@index([couponId])
  @@index([userId])
}
"""
if "model CouponUsage" not in content:
    content += coupon_usage_model

# 5. Automatically add indexes for all relational fields
blocks = re.split(r'^(?=model\s+\w+\s*\{)', content, flags=re.MULTILINE)
final_out = blocks[0]

for block in blocks[1:]:
    if block.startswith('model'):
        model_body = block
        relations = re.findall(r'@relation\(.*?fields:\s*\[([\w]+)\].*?\)', model_body)
        existing_indexes = re.findall(r'@@index\(\[([\w]+)\]\)', model_body)
        
        added_indexes = ""
        for r in relations:
            if r not in existing_indexes:
                added_indexes += f"  @@index([{r}])\n"
                existing_indexes.append(r)
                
        if "model AuditLog " in block and "entityId" not in existing_indexes:
            added_indexes += f"  @@index([entityId])\n"
        if "model VerificationToken " in block and "identifier" not in existing_indexes:
            added_indexes += f"  @@index([identifier])\n"
        if "model PasswordResetToken " in block and "identifier" not in existing_indexes:
            added_indexes += f"  @@index([identifier])\n"
            
        if added_indexes:
            last_brace_idx = block.rfind('}')
            block = block[:last_brace_idx] + "\n" + added_indexes + block[last_brace_idx:]
        final_out += block
    else:
        final_out += block

with open('prisma/schema.prisma', 'w') as f:
    f.write(final_out)

print("Indexes and CouponUsage added successfully!")
