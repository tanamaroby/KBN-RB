"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { Plantation } from "../../../../generated/prisma";

export const createPlantation = async (
  plantation: Omit<Plantation, "id" | "updatedAt">
) => {
  return await prisma.plantation.create({
    data: plantation,
  });
};

export const updatePlantationById = async (
  plantation: Omit<Plantation, "id" | "updatedAt">,
  id: string
) => {
  return await prisma.plantation.update({
    where: {
      id,
    },
    data: {
      ...plantation,
      updatedAt: dayjs().toDate(),
    },
  });
};
