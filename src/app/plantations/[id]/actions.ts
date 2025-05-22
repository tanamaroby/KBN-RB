"use server";

import { PlantationHistoryEnum } from "@/lib/constants/plantation";
import { prisma } from "@/lib/prisma";

export const getPlantationFromId = async (id: string) => {
  return await prisma.plantation.findFirst({ where: { id } });
};

export const deletePlantationFromId = async (id: string, email: string) => {
  await prisma.$transaction(async (tx) => {
    // Step 1: Get plantation data before deletion
    const plantation = await tx.plantation.findUnique({
      where: { id },
    });

    if (!plantation) throw new Error("Kebun tidak ketemu!");

    // Optional: Prevent deletion if blocks exist
    const blocks = await tx.block.findMany({
      where: { plantationId: id },
    });
    if (blocks.length > 0) {
      throw new Error(
        "Tidak dapat menghapus kebun yang masih ada block. Mohon semua block dihapus dahulu!"
      );
    }

    // Step 2: Record deletion snapshot
    await tx.plantationHistory.create({
      data: {
        plantationId: plantation.id,
        name: plantation.name,
        code: plantation.code,
        action: PlantationHistoryEnum.Delete,
        location: plantation.location,
        areaTotalHa: plantation.areaTotalHa,
        ownerCompany: plantation.ownerCompany,
        managerName: plantation.managerName,
        contactNumber: plantation.contactNumber,
        latitude: plantation.latitude,
        longitude: plantation.longitude,
        notes: plantation.notes,
        recordedBy: email,
      },
    });

    // Step 3: Update user selected plantation if same
    const user = await tx.users.findUnique({ where: { email } });
    if (!user)
      throw new Error(
        "Error terjadi! Tidak dapat menemui user yang sedang login."
      );

    if (user.selectedPlantationId === id)
      await tx.users.update({
        where: { email },
        data: { selectedPlantationId: null },
      });

    // Step 4: Delete the plantation
    await tx.plantation.delete({
      where: { id },
    });
  });
};
