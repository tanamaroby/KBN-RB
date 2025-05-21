"use server";

import { prisma } from "@/lib/prisma";

export const getPlantationFromId = async (id: string) => {
  return prisma.plantation.findFirst({ where: { id } });
};

export const deletePlantationFromId = async (id: string) => {
  return prisma.plantation.delete({ where: { id } });
};
