"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Plus, Share2, Eye, Trash2, Edit, ExternalLink, Gift, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";

interface ListItem {
  id: string;
  name: string;
  link: string;
  price: string;
  image?: string;
  purchased: boolean;
}

interface GiftList {
  id: string;
  name: string;
  occasion: string;
  description: string;
  userId: string;
  createdAt: string;
  items: ListItem[];
}

const popularStores = [
  {
    name: "Amazon",
    url: "https://amazon.com.br",
    logo: "https://logodownload.org/wp-content/uploads/2020/12/amazon-com-br-logo-0.png",
  },
  {
    name: "Mercado Livre",
    url: "https://mercadolivre.com.br",
    logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/0/04/Logotipo_MercadoLivre.png/250px-Logotipo_MercadoLivre.png",
  },
  {
    name: "Shopee",
    url: "https://shopee.com.br",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/120px-Shopee.svg.png",
  },
  {
    name: "Magazine Luiza",
    url: "https://magazineluiza.com.br",
    logo: "https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-0.png",
  },
  {
    name: "Americanas",
    url: "https://americanas.com.br",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Americanas.com_logo.svg/120px-Americanas.com_logo.svg.png",
  },
  {
    name: "Casas Bahia",
    url: "https://casasbahia.com.br",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Casas_Bahia_logo_2020.svg/250px-Casas_Bahia_logo_2020.svg.png",
  },
];

export default function EditListPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const listId = params.id as string;

  const [list, setList] = useState<GiftList | null>(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [newItemData, setNewItemData] = useState({ name: "", link: "", price: "", image: "" });

  // Novos estados para AlertDialog de exclusão
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ListItem | null>(null);

  if (!user?.id) {
    toast({ title: "Erro", description: "Usuário não autenticado." });
    return;
  }
  
  const fetchList = async () => {
    try {
      const res = await fetch(`/api/listas/${listId}`);
      if (!res.ok) throw new Error("Erro ao buscar lista");
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error(error);
      router.push("/dashboard");
    }
  };

  // Add Item
  const addItemToList = async (item: Partial<ListItem>) => {
    const res = await fetch(`/api/listas/${listId}/itens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Erro ao adicionar item");
    fetchList();
  };

  // Update Item
  const updateListItem = async (itemId: string, item: Partial<ListItem>) => {
    const res = await fetch(`/api/listas/${listId}/itens/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Erro ao atualizar item");
    fetchList();
  };

  // Delete Item
  const deleteListItem = async (itemId: string) => {
    const res = await fetch(`/api/listas/${listId}/itens/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user?.id
      },
    });
    if (!res.ok) throw new Error("Erro ao deletar item");
    fetchList();
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchList();
  }, [user]);

  useEffect(() => {
    if (list && list.userId !== user?.id) {
      router.push("/dashboard");
    }
  }, [list, user]);

  if (!user || !list) return null;

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemData.name || !newItemData.link) {
      toast({ title: "Erro", description: "Nome e link são obrigatórios.", variant: "destructive" });
      return;
    }
    await addItemToList({ ...newItemData, purchased: false });
    toast({ title: "Item adicionado!", description: "O item foi adicionado à sua lista." });
    setIsAddItemDialogOpen(false);
    setNewItemData({ name: "", link: "", price: "", image: "" });
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !newItemData.name || !newItemData.link) {
      toast({ title: "Erro", description: "Nome e link são obrigatórios.", variant: "destructive" });
      return;
    }
    await updateListItem(editingItem.id, newItemData);
    toast({ title: "Item atualizado!", description: "As alterações foram salvas." });
    setEditingItem(null);
    setNewItemData({ name: "", link: "", price: "", image: "" });
  };

  // Abre o AlertDialog para confirmação da exclusão do item
  const openDeleteDialog = (item: ListItem) => {
    setItemToDelete(item);
    setIsAlertDialogOpen(true);
  };

  // Confirma a exclusão do item após o alerta
  const confirmDeleteItem = async () => {
    if (!itemToDelete) return;

    try {
      await deleteListItem(itemToDelete.id);
      toast({ title: "Item excluído", description: "O item foi removido da lista." });
    } catch (err) {
      console.error(err);
      toast({ title: "Erro", description: "Erro ao deletar item", variant: "destructive" });
    } finally {
      setIsAlertDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleShareList = () => {
    const shareUrl = `${window.location.origin}/lista/${listId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({ title: "Link copiado!", description: "O link da lista foi copiado para a área de transferência." });
  };

  const openEditDialog = (item: ListItem) => {
    setEditingItem(item);
    setNewItemData({ name: item.name, link: item.link, price: item.price, image: item.image || "" });
  };

  const closeEditDialog = () => {
    setEditingItem(null);
    setNewItemData({ name: "", link: "", price: "", image: "" });
  };

  const resetForm = () => {
    setNewItemData({ name: "", link: "", price: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{list.name}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href={`/lista/${listId}`} target="_blank">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                  <Eye className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Visualizar</span>
                  <span className="sm:hidden">Ver</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleShareList} className="text-xs sm:text-sm bg-transparent">
                <Share2 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Compartilhar</span>
                <span className="sm:hidden">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* List Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{list.name}</CardTitle>
            <CardDescription>
              {list.occasion.charAt(0).toUpperCase() + list.occasion.slice(1).replace("-", " ")} • {list.items.length} itens
            </CardDescription>
            {list.description && <p className="text-gray-600">{list.description}</p>}
          </CardHeader>
        </Card>

        {/* Popular Stores Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Lojas Populares
            </CardTitle>
            <CardDescription>Acesse as principais lojas online para encontrar seus presentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularStores.map((store) => (
                <Link
                  key={store.name}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border rounded-lg p-4 text-center transition-all duration-200 group`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 flex items-center justify-center bg-white transition-shadow">
                      <Image
                        src={store.logo || "/placeholder.svg"}
                        alt={`${store.name} logo`}
                        width={120}
                        height={120}
                        className="max-w-28 max-h-28 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=120&width=120";
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Item Button */}
        <div className="mb-6">
          <Dialog
            open={isAddItemDialogOpen}
            onOpenChange={(open) => {
              setIsAddItemDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar novo item</DialogTitle>
                <DialogDescription>Adicione um novo presente à sua lista.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Nome do presente *</Label>
                  <Input
                    id="item-name"
                    placeholder="Ex: Jogo de Panelas Premium"
                    value={newItemData.name}
                    onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-link">Link para compra *</Label>
                  <Input
                    id="item-link"
                    type="url"
                    placeholder="https://loja.com/produto"
                    value={newItemData.link}
                    onChange={(e) => setNewItemData({ ...newItemData, link: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-price">Valor estimado</Label>
                  <CurrencyInput id="item-price" value={newItemData.price} onChange={(value) => setNewItemData({ ...newItemData, price: value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-image">URL da imagem (opcional)</Label>
                  <Input
                    id="item-image"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={newItemData.image}
                    onChange={(e) => setNewItemData({ ...newItemData, image: e.target.value })}
                  />
                  {newItemData.image && (
                    <div className="mt-2">
                      <Image
                        src={newItemData.image || "/placeholder.svg"}
                        alt="Preview"
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                    Adicionar item
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Items List */}
        {list.items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum item adicionado ainda</h3>
              <p className="text-gray-600 mb-6">Adicione itens à sua lista para que seus convidados possam ver o que você deseja ganhar.</p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white" onClick={() => setIsAddItemDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar primeiro item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.items.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {item.image && (
                    <div className="mb-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={200}
                        height={150}
                        className="w-full h-32 sm:h-40 object-scale-down rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">{item.name}</h3>
                  {item.price && (
                    <p className="text-pink-600 font-semibold mb-2 text-sm sm:text-base">
                      {item.price.startsWith("R$") ? item.price : `R$ ${item.price}`}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(item)} className="text-xs sm:text-sm">
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Editar
                    </Button>
                    <Link href={item.link} target="_blank">
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm w-full sm:w-auto bg-transparent">
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Ver loja
                      </Button>
                    </Link>
                    {/* Botão que abre o AlertDialog para exclusão */}
                    <AlertDialog open={isAlertDialogOpen && itemToDelete?.id === item.id} onOpenChange={setIsAlertDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent text-xs sm:text-sm w-full sm:w-auto"
                          onClick={() => openDeleteDialog(item)}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir <strong>{itemToDelete?.name}</strong>? Essa ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmDeleteItem}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Item Dialog */}
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && closeEditDialog()}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar item</DialogTitle>
              <DialogDescription>Faça as alterações necessárias no item.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-item-name">Nome do presente *</Label>
                <Input
                  id="edit-item-name"
                  placeholder="Ex: Jogo de Panelas Premium"
                  value={newItemData.name}
                  onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-link">Link para compra *</Label>
                <Input
                  id="edit-item-link"
                  type="url"
                  placeholder="https://loja.com/produto"
                  value={newItemData.link}
                  onChange={(e) => setNewItemData({ ...newItemData, link: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-price">Valor estimado</Label>
                <CurrencyInput
                  id="edit-item-price"
                  value={newItemData.price}
                  onChange={(value) => setNewItemData({ ...newItemData, price: value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-image">URL da imagem (opcional)</Label>
                <Input
                  id="edit-item-image"
                  type="url"
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={newItemData.image}
                  onChange={(e) => setNewItemData({ ...newItemData, image: e.target.value })}
                />
                {newItemData.image && (
                  <div className="mt-2">
                    <Image
                      src={newItemData.image || "/placeholder.svg"}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover rounded border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={closeEditDialog}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                  Salvar alterações
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
