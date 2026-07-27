-- Align physical auth tables with the @@map/@map directives already declared
-- in schema.prisma. These tables were created before the mapping was added
-- and were never migrated, causing P2021 "table does not exist" errors
-- (e.g. registration looking for "users" while the physical table was "User").

-- ==== users (was "User") ====
ALTER TABLE "User" RENAME TO "users";
ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password_hash";
ALTER TABLE "users" RENAME COLUMN "isEmailVerified" TO "is_email_verified";
ALTER TABLE "users" RENAME COLUMN "isDeleted" TO "is_deleted";
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE "users"
  ALTER COLUMN "created_at" TYPE TIMESTAMPTZ,
  ALTER COLUMN "updated_at" TYPE TIMESTAMPTZ;
ALTER TABLE "users" ADD COLUMN "phone" TEXT;
ALTER TABLE "users" ADD COLUMN "image" TEXT;
ALTER TABLE "users" ADD COLUMN "address" TEXT;
ALTER TABLE "users" ADD COLUMN "terms_accepted_at" TIMESTAMPTZ;
ALTER TABLE "users" ADD COLUMN "deleted_at" TIMESTAMPTZ;
CREATE UNIQUE INDEX "User_phone_key" ON "users"("phone");

-- ==== accounts (was "Account") ====
ALTER TABLE "Account" RENAME TO "accounts";
ALTER TABLE "accounts" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "accounts" RENAME COLUMN "providerAccountId" TO "provider_account_id";
ALTER TABLE "accounts" RENAME COLUMN "refreshToken" TO "refresh_token";
ALTER TABLE "accounts" RENAME COLUMN "accessToken" TO "access_token";
ALTER TABLE "accounts" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "accounts" ALTER COLUMN "created_at" TYPE TIMESTAMPTZ;

-- ==== verification_tokens (was "VerificationToken") ====
ALTER TABLE "VerificationToken" RENAME TO "verification_tokens";
ALTER TABLE "verification_tokens" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "verification_tokens"
  ALTER COLUMN "created_at" TYPE TIMESTAMPTZ,
  ALTER COLUMN "expires" TYPE TIMESTAMPTZ;

-- ==== password_reset_tokens (was "PasswordResetToken") ====
ALTER TABLE "PasswordResetToken" RENAME TO "password_reset_tokens";
ALTER TABLE "password_reset_tokens" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "password_reset_tokens"
  ALTER COLUMN "created_at" TYPE TIMESTAMPTZ,
  ALTER COLUMN "expires" TYPE TIMESTAMPTZ;
