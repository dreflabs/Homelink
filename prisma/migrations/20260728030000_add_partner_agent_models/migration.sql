-- Agency, PartnerAgentProfile, AgentClient, and Property.agentId exist in
-- schema.prisma (partner agent feature) but were never migrated, causing
-- P2022 "column does not exist" on any query touching Property/agent data.

-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerAgentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agencyId" TEXT,
    "licenseNo" TEXT,
    "bio" TEXT,
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerAgentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentClient" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentClient_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Property" ADD COLUMN "agentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PartnerAgentProfile_userId_key" ON "PartnerAgentProfile"("userId");

-- CreateIndex
CREATE INDEX "AgentClient_agentId_idx" ON "AgentClient"("agentId");

-- AddForeignKey
ALTER TABLE "PartnerAgentProfile" ADD CONSTRAINT "PartnerAgentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerAgentProfile" ADD CONSTRAINT "PartnerAgentProfile_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentClient" ADD CONSTRAINT "AgentClient_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "PartnerAgentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "PartnerAgentProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
