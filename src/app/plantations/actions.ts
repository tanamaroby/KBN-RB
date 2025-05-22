"use server";

import { prisma } from "@/lib/prisma";

export const setUserSelectedPlantation = async (id: string, email: string) => {
  return await prisma.users.update({
    where: {
      email,
    },
    data: {
      selectedPlantationId: id,
    },
  });
};

export const getAllPlantationHistory = async () => {
  return await prisma.plantationHistory.findMany();
};

export const getPlantationHistoryFromId = async (id: string) => {
  return await prisma.plantationHistory.findMany({
    where: { plantationId: id },
  });
};

export const getPlantationHistoryFromIdSortedByDate = async (id: string) => {
  return await prisma.plantationHistory.findMany({
    where: { plantationId: id },
    orderBy: { recordedAt: "desc" },
  });
};
