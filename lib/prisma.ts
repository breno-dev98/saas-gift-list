// lib/prisma.ts
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // opcional: remove se não quiser logs
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
