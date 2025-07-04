"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, User, Lock, Trash2, Gift, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ConfiguracoesPage() {
  const { user, updateUser, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }
    setUserData({
      name: user.name,
      email: user.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }, [user, router])

  if (!user) {
    return null
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()

    updateUser({
      name: userData.name,
      email: userData.email,
    })

    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    })
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    if (userData.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    // Simulação de alteração de senha
    toast({
      title: "Senha alterada!",
      description: "Sua senha foi atualizada com sucesso.",
    })

    setUserData({
      ...userData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleDeleteAccount = () => {
    // Simulação de exclusão de conta
    toast({
      title: "Conta excluída",
      description: "Sua conta foi removida com sucesso.",
    })
    logout()
    router.push("/")
  }

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
                  <span className="hidden sm:inline">Voltar ao painel</span>
                  <span className="sm:hidden">Voltar</span>
                </Button>
              </Link>
              <Link href="/#planos">
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Ver planos</span>
                  <span className="sm:hidden">Planos</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Configurações</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        {/* Profile Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informações do Perfil
            </CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto">
                Salvar alterações
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Alterar Senha
            </CardTitle>
            <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha atual</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={userData.currentPassword}
                  onChange={(e) => setUserData({ ...userData, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={userData.newPassword}
                  onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto">
                Alterar senha
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <Trash2 className="h-5 w-5 mr-2" />
              Zona de Perigo
            </CardTitle>
            <CardDescription>Ações irreversíveis para sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-red-800 mb-2">Excluir conta</h4>
              <p className="text-red-700 text-sm mb-4">
                Esta ação não pode ser desfeita. Todas as suas listas e dados serão permanentemente removidos.
              </p>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir minha conta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem certeza absoluta?</DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá todos os seus
                      dados de nossos servidores.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Sim, excluir minha conta
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
