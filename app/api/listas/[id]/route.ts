// app/api/listas/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const lista = await prisma.giftList.findUnique({
      where: { id: params.id }, 
      include: { items: true },
    });

    if (!lista) {
      return NextResponse.json({ error: "Lista não encontrada" }, { status: 404 });
    }

    return NextResponse.json(lista);
  } catch (error) {
    console.error("Erro ao buscar lista:", error);
    return NextResponse.json({ error: "Erro ao buscar lista" }, { status: 500 });
  }
}
