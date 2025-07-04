import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const list = await prisma.giftList.findUnique({
      where: { slug: params.slug },
      include: { items: true },
    });

    if (!list) {
      return NextResponse.json({ error: "Lista não encontrada" }, { status: 404 });
    }

    return NextResponse.json(list);
  } catch (error) {
    console.error("Erro ao buscar lista:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
