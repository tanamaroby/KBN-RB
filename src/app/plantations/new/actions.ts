"use server";

import { PlantationHistoryEnum } from "@/lib/constants/plantation";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { Plantation } from "../../../../generated/prisma";

export const createPlantation = async (
  plantation: Omit<Plantation, "id" | "updatedAt">,
  email: string
) => {
  return await prisma.$transaction(async (tx) => {
    // Step 1: Creating the plantation item
    const newPlantation = await tx.plantation.create({
      data: plantation,
    });

    // Step 2: Updating logs
    await tx.plantationHistory.create({
      data: {
        plantationId: newPlantation.id,
        name: newPlantation.name,
        code: newPlantation.code,
        action: PlantationHistoryEnum.Create,
        location: newPlantation.location,
        areaTotalHa: newPlantation.areaTotalHa,
        ownerCompany: newPlantation.ownerCompany,
        managerName: newPlantation.managerName,
        contactNumber: newPlantation.contactNumber,
        latitude: newPlantation.latitude,
        longitude: newPlantation.longitude,
        notes: newPlantation.notes,
        recordedBy: email,
      },
    });
    return newPlantation;
  });
};

export const updatePlantationById = async (
  plantation: Omit<Plantation, "id" | "updatedAt">,
  id: string,
  email: string
) => {
  await prisma.plantation.update({
    where: {
      id,
    },
    data: {
      ...plantation,
      updatedAt: dayjs().toDate(),
    },
  });
  return await prisma.$transaction(async (tx) => {
    // Step 1: Updating the plantation item
    const newPlantation = await tx.plantation.update({
      where: {
        id,
      },
      data: {
        ...plantation,
        updatedAt: dayjs().toDate(),
      },
    });

    // Step 2: Updating the plantation history
    await tx.plantationHistory.create({
      data: {
        plantationId: id,
        name: plantation.name,
        code: plantation.code,
        action: PlantationHistoryEnum.Update,
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

    return newPlantation;
  });
};
