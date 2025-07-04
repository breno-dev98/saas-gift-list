// app/api/listas/route.ts
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Recebido no POST /api/listas:", body);

    const lista = await prisma.giftList.create({
      data: {
        name: body.name,
        occasion: body.occasion,
        description: body.description,
        userId: body.userId,
        slug: nanoid(10), // ← aqui gera automaticamente
        items: {
          create: body.items || [],
        },
      },
      include: { items: true },
    });

    console.log("Lista criada com sucesso:", lista);

    return NextResponse.json(lista, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar lista:", error);
    return NextResponse.json({ error: "Erro ao criar lista" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const listas = await prisma.giftList.findMany({
      include: { items: true },
    });

    console.log("Listas encontradas:", listas.length);

    return NextResponse.json(listas);
  } catch (error) {
    console.error("Erro ao buscar listas:", error);
    return NextResponse.json({ error: "Erro ao buscar listas" }, { status: 500 });
  }
}
