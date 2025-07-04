import { prisma } from "@/lib/prisma";

async function test() {
  const lists = await prisma.giftList.findMany();
  console.log("Listas no banco:", lists);
  process.exit(0);
}

test().catch((e) => {
  console.error(e);
  process.exit(1);
});
