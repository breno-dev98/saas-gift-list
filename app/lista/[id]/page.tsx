"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gift, ExternalLink, CheckCircle, Heart, Share2, User, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api/axios";

export default function PublicListPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [reserveDialogOpen, setReserveDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [personName, setPersonName] = useState("");

  interface ListItem {
    id: string;
    name: string;
    link: string;
    price: string;
    image?: string;
    purchased: boolean;
    reservedBy?: string;
    reservedAt?: string;
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

  const listId = params.id as string;
  const [list, setList] = useState<GiftList | null>(null);

  const fetchList = async () => {
    try {
      const res = await api.get(`/listas/${listId}`);
      setList(res.data);
    } catch (error) {
      console.error("Erro ao buscar lista:", error);
      setList(null);
    }
  };

  const reserveItem = async (listId: string, itemId: string, reservedBy: string) => {
    try {
      await api.put(`/listas/${listId}/itens/${itemId}/reservar`, { reservedBy });
      fetchList();
    } catch (error) {
      console.error("Erro ao reservar item:", error);
    }
  };

  const unreserveItem = async (listId: string, itemId: string) => {
    try {
      await api.put(`/listas/${listId}/itens/${itemId}/cancelar-reserva`);
      fetchList();
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (listId) fetchList();
  }, [listId]);

  const isOwnerViewing = user && list && list.userId === user.id;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lista não encontrada</h2>
            <p className="text-gray-600 mb-6">A lista que você está procurando não existe ou foi removida.</p>
            <Link href="/">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">Voltar ao início</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: list.name,
        text: `Confira a lista de presentes: ${list.name}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copiado!",
        description: "O link da lista foi copiado para a área de transferência.",
      });
    }
  };

  const handleReserveItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setReserveDialogOpen(true);
  };

  const handleConfirmReservation = () => {
    if (!selectedItemId || !personName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite seu nome.",
        variant: "destructive",
      });
      return;
    }

    reserveItem(listId, selectedItemId, personName.trim());
    toast({
      title: "Presente reservado!",
      description: `Obrigado por escolher este presente, ${personName}!`,
    });

    setReserveDialogOpen(false);
    setSelectedItemId(null);
    setPersonName("");
  };

  const handleUnreserveItem = (itemId: string, itemName: string) => {
    unreserveItem(listId, itemId);
    toast({
      title: "Reserva cancelada",
      description: `"${itemName}" está disponível novamente.`,
    });
  };

  const handleClosePreview = () => {
    if (isOwnerViewing) {
      router.push(`/dashboard/lista/${listId}`);
    } else {
      router.push("/");
    }
  };

  const purchasedCount = list.items.filter((item) => item.purchased).length;
  const totalItems = list.items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Meus Presentes</span>
          </Link>
          <div className="flex items-center space-x-2">
            {isOwnerViewing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClosePreview}
                className="text-xs sm:text-sm bg-transparent border-gray-300 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Fechar Visualização</span>
                <span className="sm:hidden">Fechar</span>
              </Button>
            )}
            <Button title="Compartilhar" variant="outline" size="sm" onClick={handleShare} className="text-xs sm:text-sm bg-transparent">
              <Share2 className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Compartilhar</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* List Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-4">{list.name}</h1>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-600 mb-4 text-sm sm:text-base">
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {list.occasion.charAt(0).toUpperCase() + list.occasion.slice(1).replace("-", " ")}
            </span>
            <span>{totalItems} itens</span>
            <span>{purchasedCount} reservados</span>
          </div>
          {list.description && <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4">{list.description}</p>}

          {/* Progress Bar */}
          {totalItems > 0 && (
            <div className="max-w-md mx-auto mt-4 sm:mt-6 px-4">
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                <span>Progresso dos presentes</span>
                <span>{Math.round((purchasedCount / totalItems) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(purchasedCount / totalItems) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Items Grid */}
        {list.items.length === 0 ? (
          <Card className="text-center py-12 max-w-md mx-auto">
            <CardContent>
              <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lista em construção</h3>
              <p className="text-gray-600">Os itens desta lista ainda estão sendo adicionados. Volte em breve!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.items.map((item) => (
              <Card
                key={item.id}
                className={`hover:shadow-lg transition-all duration-200 ${item.purchased ? "bg-green-50 border-green-200" : "hover:shadow-lg"}`}
              >
                <CardContent className="p-4 sm:p-6">
                  {item.image && (
                    <div className="mb-4 relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="w-full h-40 sm:h-48 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      {item.purchased && (
                        <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <div className="bg-green-500 text-white p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`font-semibold text-base sm:text-lg ${item.purchased ? "text-green-800" : "text-gray-900"} line-clamp-2`}>
                      {item.name}
                    </h3>
                    {item.purchased && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 ml-2" />}
                  </div>

                  {item.price && (
                    <p className={`font-semibold mb-4 text-sm sm:text-base ${item.purchased ? "text-green-600" : "text-pink-600"}`}>
                      {item.price.startsWith("R$") ? item.price : `R$ ${item.price}`}
                    </p>
                  )}

                  {item.purchased ? (
                    <div className="space-y-2">
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-center font-medium text-sm sm:text-base">
                        <div className="flex items-center justify-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Reservado por {item.reservedBy}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-green-700 border-green-300 hover:bg-green-50 bg-transparent text-xs sm:text-sm"
                        onClick={() => handleUnreserveItem(item.id, item.name)}
                      >
                        Cancelar reserva
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href={item.link} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-sm sm:text-base">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver na loja
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent text-xs sm:text-sm"
                        onClick={() => handleReserveItem(item.id)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Vou dar este presente
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reserve Item Dialog */}
        <Dialog open={reserveDialogOpen} onOpenChange={setReserveDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reservar presente</DialogTitle>
              <DialogDescription>Digite seu nome para reservar este presente. Assim todos saberão que você vai dar este item!</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="person-name">Seu nome *</Label>
                <Input
                  id="person-name"
                  placeholder="Digite seu nome completo"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setReserveDialogOpen(false);
                    setPersonName("");
                    setSelectedItemId(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleConfirmReservation} className="bg-pink-600 hover:bg-pink-700">
                  Confirmar reserva
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Footer CTA */}
        <div className="text-center mt-12 sm:mt-16 py-8 sm:py-12 bg-white rounded-2xl shadow-lg mx-4 sm:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Gostou da ideia?</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
            Crie sua própria lista de presentes personalizada e compartilhe com seus convidados!
          </p>
          <Link href="/auth" className="block w-full sm:inline-block sm:w-auto max-w-sm mx-auto px-3">
            <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base w-full">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Criar minha lista grátis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
