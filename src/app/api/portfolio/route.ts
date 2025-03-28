import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ordinals: { floorPrice: number }[] =
      await prisma.userOrdinal.findMany({
        select: { floorPrice: true },
      });

    const totalPortfolioValue = ordinals.reduce(
      (sum: number, ordinal: { floorPrice: number }) =>
        sum + ordinal.floorPrice,
      0
    );

    const availableLiquidity = ordinals
      .filter((ordinal) => ordinal.floorPrice >= 0.00065)
      .reduce(
        (sum: number, ordinal: { floorPrice: number }) =>
          sum + ordinal.floorPrice,
        0
      );

    return NextResponse.json({
      totalPortfolioValue,
      availableLiquidity,
    });
  } catch (error) {
    console.log("Error getting portfolio stats", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio stats" },
      { status: 500 }
    );
  }
}
