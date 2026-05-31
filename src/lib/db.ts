import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = globalThis as unknown as {

  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const isBuild = process.env.NEXT_PHASE === "phase-production-build"
  const max = Number(process.env.PRISMA_POOL_MAX) || (isBuild ? 2 : 5)
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 15_000,
  })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}