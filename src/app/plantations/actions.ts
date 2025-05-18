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
