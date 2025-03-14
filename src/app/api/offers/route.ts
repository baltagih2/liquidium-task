import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        ordinal: true,
      },
    });

    return NextResponse.json(offers);
  } catch (error) {
    console.log("Error getting offers", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { ordinalId, amount, ltv, termDays, interest } = await req.json();

    if (!ordinalId || amount <= 0 || termDays <= 0 || interest < 0) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const offer = await prisma.offer.create({
      data: {
        ordinalId,
        amount,
        ltv,
        termDays,
        interest,
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.log("Error creating offer", error);
    return NextResponse.json(
      { error: "Failed to create offer" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { offerId } = await req.json();

    if (!offerId) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 }
      );
    }

    await prisma.offer.delete({
      where: { id: offerId },
    });

    return NextResponse.json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.log("Error deleting offer", error);
    return NextResponse.json(
      { error: "Failed to delete offer" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { offerId, amount, ltv, termDays, interest } = await req.json();

    if (!offerId || amount <= 0 || termDays <= 0 || interest < 0) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: { amount, ltv, termDays, interest },
    });

    return NextResponse.json(updatedOffer);
  } catch (error) {
    console.log("Error updating offer", error);
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }
}
