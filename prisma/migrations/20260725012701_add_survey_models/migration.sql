-- CreateTable
CREATE TABLE "SurveyTask" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "surveyorId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyReport" (
    "id" TEXT NOT NULL,
    "surveyTaskId" TEXT NOT NULL,
    "notes" TEXT,
    "documentsUrl" TEXT[],
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SurveyReport_surveyTaskId_key" ON "SurveyReport"("surveyTaskId");

-- AddForeignKey
ALTER TABLE "SurveyTask" ADD CONSTRAINT "SurveyTask_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyTask" ADD CONSTRAINT "SurveyTask_surveyorId_fkey" FOREIGN KEY ("surveyorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyReport" ADD CONSTRAINT "SurveyReport_surveyTaskId_fkey" FOREIGN KEY ("surveyTaskId") REFERENCES "SurveyTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
