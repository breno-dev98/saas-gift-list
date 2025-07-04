// app/api/listas/[listId]/itens/[itemId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string; itemId: string } }) {
  const { id: listId, itemId } = params;
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }

  const item = await prisma.listItem.findFirst({
    where: {
      id: itemId,
      giftListId: listId,
      giftList: {
        userId,
      },
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Item não encontrado ou você não tem permissão." }, { status: 404 });
  }

  await prisma.listItem.delete({
    where: { id: itemId },
  });

  return NextResponse.json({ message: "Item excluído com sucesso." });
}


