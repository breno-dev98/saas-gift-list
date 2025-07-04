"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GiftList } from "@/types/giftList"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { occasionLabels, occasionOptions } from "@/utils/occasions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import { Gift, Plus, Share2, Eye, Settings, LogOut, Trash2, Edit, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { api } from "@/lib/api/axios"

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [lists, setLists] = useState<GiftList[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newListData, setNewListData] = useState({
    name: "",
    occasion: "",
    description: "",
  });
  

  // Estados para AlertDialog
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
      return;
    }

    if (!loading && user) {
      const fetchLists = async () => {
        try {
          const res = await api.get("/listas");
          const data = await res.data;

          // Agora é seguro acessar user.id
          const userLists = data.filter((list: GiftList) => list.userId === user.id);
          setLists(userLists);
        } catch (err) {
          console.error("Erro ao buscar listas:", err);
          toast({ title: "Erro", description: "Erro ao carregar listas.", variant: "destructive" });
        }
      };
      fetchLists();
    }

  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  

  const userLists = lists.filter((list) => list.userId === user.id);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newListData.name || !newListData.occasion) {
      toast({
        title: "Erro",
        description: "Nome e ocasião são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await api.post("/listas", {
        ...newListData,
        items: [],
        userId: user.id,
      });

      const newList: GiftList = response.data;

      toast({
        title: "Lista criada com sucesso!",
        description: "Agora você pode adicionar itens à sua lista.",
      });

      setIsCreateDialogOpen(false);
      setNewListData({ name: "", occasion: "", description: "" });
      setLists((prev) => [...prev, newList]);
      router.push(`/dashboard/lista/${newList.id}`);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Erro",
        description: err?.response?.data?.error || "Erro ao criar lista.",
        variant: "destructive",
      });
    }
  };


  // Abre o AlertDialog para confirmar exclusão
  const openDeleteDialog = (id: string, name: string) => {
    setListToDelete({ id, name });
    setAlertDialogOpen(true);
  };

  // Confirma exclusão e chama a API
  const confirmDeleteList = async () => {
    if (!listToDelete) return;

    try {
      await api.delete(`/listas/${listToDelete.id}`);

      setLists((prev) => prev.filter((list) => list.id !== listToDelete.id));
      toast({
        title: "Lista excluída",
        description: "A lista foi removida com sucesso.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro",
        description: "Erro ao deletar item",
        variant: "destructive",
      });
    } finally {
      setAlertDialogOpen(false);
      setListToDelete(null);
    }
  };

  const handleShareList = (listId: string) => {
    const shareUrl = `${window.location.origin}/lista/${listId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copiado!",
      description: "O link da lista foi copiado para a área de transferência.",
    });
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
              <span className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Meus Presentes</span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-gray-600 text-sm sm:text-base hidden md:flex">Olá, {user?.name}!</span>
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/#planos">
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Planos
                  </Button>
                </Link>
                <Link href="/configuracoes">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
              <div className="sm:hidden">
                <Link href="/configuracoes">
                  <Button variant="ghost">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bem-vindo, {user.name}!</h1>
          <p className="text-gray-600 text-sm sm:text-base">Gerencie suas listas de presentes e compartilhe com seus convidados.</p>
        </div>

        {/* Create New List Button */}
        <div className="mb-6 sm:mb-8">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Criar nova lista
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar nova lista de presentes</DialogTitle>
                <DialogDescription>Preencha as informações da sua nova lista de presentes.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateList} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="list-name">Nome da lista *</Label>
                  <Input
                    id="list-name"
                    placeholder="Ex: Lista de Casamento do João e Ana"
                    value={newListData.name}
                    onChange={(e) => setNewListData({ ...newListData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="list-occasion">Ocasião *</Label>
                  <Select value={newListData.occasion} onValueChange={(value) => setNewListData({ ...newListData, occasion: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a ocasião" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasionOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="list-description">Descrição (opcional)</Label>
                  <Textarea
                    id="list-description"
                    placeholder="Adicione uma descrição para sua lista..."
                    value={newListData.description}
                    onChange={(e) => setNewListData({ ...newListData, description: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                    Criar lista
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lists Grid */}
        {userLists.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma lista criada ainda</h3>
              <p className="text-gray-600 mb-6">Crie sua primeira lista de presentes e comece a compartilhar com seus convidados.</p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar primeira lista
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userLists.map((list) => (
              <Card key={list.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{list.name}</CardTitle>
                  <CardDescription>
                    {occasionLabels[list.occasion] || "Ocasião desconhecida"} • {list.items.length} itens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {list.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{list.description}</p>}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/dashboard/lista/${list.id}`}>
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm bg-transparent">
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Editar
                      </Button>
                    </Link>
                    <Link href={`/lista/${list.id}`} target="_blank">
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm bg-transparent">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => handleShareList(list.id)} className="text-xs sm:text-sm">
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Compartilhar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent text-xs sm:text-sm"
                      onClick={() => openDeleteDialog(list.id, list.name)}
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* AlertDialog para confirmação de exclusão */}
      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a lista "{listToDelete?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertDialogOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteList} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
