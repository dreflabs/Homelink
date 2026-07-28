-- @auth/prisma-adapter requires specific field names on Account for OAuth
-- token linking (type, refresh_token, access_token, expires_at, token_type,
-- scope, id_token, session_state). Without these, linking a Google account
-- throws because the adapter passes keys Prisma doesn't recognize.

ALTER TABLE "accounts" ADD COLUMN "type" TEXT NOT NULL;
ALTER TABLE "accounts" ADD COLUMN "expires_at" INTEGER;
ALTER TABLE "accounts" ADD COLUMN "token_type" TEXT;
ALTER TABLE "accounts" ADD COLUMN "scope" TEXT;
ALTER TABLE "accounts" ADD COLUMN "id_token" TEXT;
ALTER TABLE "accounts" ADD COLUMN "session_state" TEXT;

ALTER TABLE "accounts" DROP CONSTRAINT "Account_userId_fkey";
ALTER TABLE "accounts" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Google-registered users have no password; only Credentials-registered
-- users set this.
ALTER TABLE "users" ALTER COLUMN "password_hash" DROP NOT NULL;
