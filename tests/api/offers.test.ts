import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const API_URL = "http://localhost:3000/api/offers";

describe("API - Fetch Offers", () => {
  it("should return a list of offers", async () => {
    const response = await fetch(API_URL, { method: "GET" });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});
