"use server";

import { prisma } from "@/lib/prisma";

export const getAllUsers = async () => {
  return prisma.users.findMany();
};

export const getFirstUser = async () => {
  return prisma.users.findFirst();
};
