"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { Plantation } from "../../../../generated/prisma";

export const createOrUpdatePlantation = async (
  plantation: Omit<Plantation, "id" | "updatedAt"> & {
    id: string | undefined;
  }
) => {
  return await prisma.plantation.upsert({
    where: {
      id: plantation.id,
    },
    update: {
      ...plantation,
      updatedAt: dayjs().toDate(),
    },
    create: {
      ...plantation,
    },
  });
};
