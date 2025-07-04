// app/api/listas/[id]/itens/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const giftListId = params.id;
    const { name, link, price, image } = await request.json();

    if (!name || !link) {
      return NextResponse.json({ error: "Nome e link são obrigatórios." }, { status: 400 });
    }

    const newItem = await prisma.listItem.create({
      data: {
        name,
        link,
        price,
        image,
        purchased: false,
        giftListId,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar item:", error);
    return NextResponse.json({ error: "Erro ao adicionar item." }, { status: 500 });
  }
}
