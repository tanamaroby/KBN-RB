-- CreateTable
CREATE TABLE "Plantation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "location" TEXT,
    "areaTotalHa" DOUBLE PRECISION,
    "ownerCompany" TEXT,
    "managerName" TEXT,
    "contactNumber" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plantation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "plantationId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "blockCode" TEXT NOT NULL,
    "areaLahanHa" DOUBLE PRECISION NOT NULL,
    "areaPokokHa" DOUBLE PRECISION NOT NULL,
    "tm" INTEGER NOT NULL,
    "tb1" INTEGER NOT NULL,
    "tb2" INTEGER NOT NULL,
    "tb3" INTEGER NOT NULL,
    "pokokHidup" INTEGER NOT NULL,
    "pokokMati" INTEGER NOT NULL,
    "pokokTotal" INTEGER NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plantation_code_key" ON "Plantation"("code");

-- CreateIndex
CREATE INDEX "Block_plantationId_idx" ON "Block"("plantationId");

-- CreateIndex
CREATE UNIQUE INDEX "Block_plantationId_blockCode_year_key" ON "Block"("plantationId", "blockCode", "year");

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_plantationId_fkey" FOREIGN KEY ("plantationId") REFERENCES "Plantation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
