"use server";

import { prisma } from "@/lib/prisma";
import { Plantation } from "../../../../generated/prisma";

export const createNewPlantation = async (
  plantation: Omit<Plantation, "id" | "updatedAt">
) => {
  return await prisma.plantation.create({ data: plantation });
};
