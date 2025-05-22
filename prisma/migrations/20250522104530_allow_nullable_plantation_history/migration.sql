-- DropForeignKey
ALTER TABLE "PlantationHistory" DROP CONSTRAINT "PlantationHistory_plantationId_fkey";

-- AlterTable
ALTER TABLE "PlantationHistory" ALTER COLUMN "plantationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PlantationHistory" ADD CONSTRAINT "PlantationHistory_plantationId_fkey" FOREIGN KEY ("plantationId") REFERENCES "Plantation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
