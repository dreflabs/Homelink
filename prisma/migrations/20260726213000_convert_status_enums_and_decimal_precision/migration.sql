-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COUNTERED');

-- AlterTable
ALTER TABLE "Property"
  ALTER COLUMN "price" TYPE NUMERIC(15,2),
  ALTER COLUMN "status" TYPE "PropertyStatus" USING "status"::"PropertyStatus",
  ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Booking"
  ALTER COLUMN "status" TYPE "BookingStatus" USING "status"::"BookingStatus",
  ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Offer"
  ALTER COLUMN "amount" TYPE NUMERIC(15,2),
  ALTER COLUMN "status" TYPE "OfferStatus" USING "status"::"OfferStatus",
  ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Commission"
  ALTER COLUMN "percentage" TYPE NUMERIC(5,2),
  ALTER COLUMN "amount" TYPE NUMERIC(15,2);

-- AlterTable
ALTER TABLE "Invoice"
  ALTER COLUMN "amount" TYPE NUMERIC(15,2);

-- AlterTable
ALTER TABLE "Coupon"
  ALTER COLUMN "discount" TYPE NUMERIC(15,2);
