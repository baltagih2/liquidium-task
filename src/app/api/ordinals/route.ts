import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ordinals = await prisma.userOrdinal.findMany({
      where: {
        collection: { isNot: null },
      },
      include: {
        collection: true,
      },
    });

    return NextResponse.json(ordinals);
  } catch (error) {
    console.log("Error getting ordinals", error);
    return NextResponse.json(
      { error: "Failed to fetch ordinals" },
      { status: 500 }
    );
  }
}
