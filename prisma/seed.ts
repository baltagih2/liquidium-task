import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const collectionsData = JSON.parse(
    fs.readFileSync("prisma/supported_ordinal_collections.json", "utf-8")
  );
  const walletData = JSON.parse(
    fs.readFileSync("prisma/your_owned_ordinals.json", "utf-8")
  ).data;

  for (const collection of collectionsData) {
    await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: {},
      create: {
        id: crypto.randomUUID(),
        name: collection.slug,
        slug: collection.slug,
      },
    });
  }

  for (const ordinal of walletData) {
    if (!ordinal.slug) continue;

    const collection = await prisma.collection.findUnique({
      where: { slug: ordinal.slug },
    });

    if (!collection) continue;

    await prisma.userOrdinal.upsert({
      where: { inscriptionId: ordinal.inscription_id },
      update: {},
      create: {
        inscriptionId: ordinal.inscription_id,
        inscriptionName: ordinal.inscription_name,
        collectionId: collection.id,
        ownerWallet: ordinal.owner_wallet_addr,
        mimeType: ordinal.mime_type,
        floorPrice: ordinal.output_value / 100_000_000,
        lastSalePrice: ordinal.last_sale_price / 100_000_000,
        metadata: ordinal.metadata,
        contentUrl: ordinal.content_url,
        bisUrl: ordinal.bis_url,
        renderUrl: ordinal.render_url,
      },
    });
  }

  console.log("===== Database seed success =====");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
