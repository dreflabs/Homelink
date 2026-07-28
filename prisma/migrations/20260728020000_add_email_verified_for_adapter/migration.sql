-- @auth/prisma-adapter's User createUser/updateUser calls always pass an
-- `emailVerified` field (DateTime | null). Our User model only tracked
-- verification via the custom `isEmailVerified` boolean, so Prisma
-- rejected the adapter's create call with "Unknown argument emailVerified".
-- Add it alongside isEmailVerified rather than replacing it, since existing
-- app code reads isEmailVerified.

ALTER TABLE "users" ADD COLUMN "email_verified" TIMESTAMPTZ;
