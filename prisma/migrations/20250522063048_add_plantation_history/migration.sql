-- CreateTable
CREATE TABLE "PlantationHistory" (
    "id" TEXT NOT NULL,
    "plantationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "location" TEXT,
    "areaTotalHa" DOUBLE PRECISION,
    "ownerCompany" TEXT,
    "managerName" TEXT,
    "contactNumber" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "notes" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordedBy" TEXT,

    CONSTRAINT "PlantationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlantationHistory_plantationId_idx" ON "PlantationHistory"("plantationId");

-- AddForeignKey
ALTER TABLE "PlantationHistory" ADD CONSTRAINT "PlantationHistory_plantationId_fkey" FOREIGN KEY ("plantationId") REFERENCES "Plantation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
