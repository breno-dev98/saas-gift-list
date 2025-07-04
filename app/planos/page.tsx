"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Check, Star, Crown, Zap, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function PlanosPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectPlan = (planId: string, planName: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plano selecionado!",
      description: `Você escolheu o plano ${planName}. Redirecionando para o pagamento...`,
    });

    // Aqui você integraria com um gateway de pagamento como Stripe, PagSeguro, etc.
    setTimeout(() => {
      toast({
        title: "Em breve!",
        description: "A integração com pagamento será implementada em breve.",
      });
    }, 2000);
  };

  const plans = [
    {
      id: "basico",
      name: "Básico",
      price: "R$ 19,90",
      period: "pagamento único",
      description: "Perfeito para um evento especial",
      features: [
        "1 lista de presentes",
        "Até 15 itens por lista",
        "Compartilhamento ilimitado",
        "Suporte por email",
        "Válido por 1 ano",
        "Sem anúncios",
      ],
      icon: Gift,
      color: "from-blue-500 to-blue-600",
      popular: false,
      savings: null,
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 49,90",
      period: "pagamento único",
      description: "Ideal para múltiplos eventos",
      features: [
        "3 listas de presentes",
        "Até 30 itens por lista",
        "Compartilhamento ilimitado",
        "Personalização avançada",
        "Suporte prioritário",
        "Relatórios detalhados",
        "Válido por 2 anos",
        "Sem anúncios",
      ],
      icon: Star,
      color: "from-pink-500 to-purple-600",
      popular: true,
      savings: "Economize R$ 9,80",
    },
    {
      id: "professional",
      name: "Professional",
      price: "R$ 99,90",
      period: "pagamento único",
      description: "Para organizadores de eventos",
      features: [
        "8 listas de presentes",
        "Até 50 itens por lista",
        "Múltiplos administradores",
        "Branding personalizado",
        "Suporte 24/7",
        "Analytics avançados",
        "Válido por 3 anos",
        "Backup automático",
        "Sem anúncios",
      ],
      icon: Crown,
      color: "from-purple-600 to-indigo-600",
      popular: false,
      savings: "Economize R$ 59,30",
    },
  ];

  const addOnPlans = [
    {
      id: "lista-extra",
      name: "Lista Extra",
      price: "R$ 12,90",
      description: "Adicione mais uma lista ao seu plano atual",
      features: ["1 lista adicional", "Mesmos recursos do seu plano", "Válido pelo tempo restante"],
    },
    {
      id: "upgrade-itens",
      name: "Mais Itens",
      price: "R$ 9,90",
      description: "Aumente o limite de itens das suas listas",
      features: ["+20 itens por lista", "Aplicado a todas as listas", "Válido pelo tempo restante"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Meus Presentes</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Voltar ao painel</span>
              <span className="sm:hidden">Voltar</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Escolha o plano ideal para você</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pague uma vez e use por anos! Crie listas incríveis sem mensalidades. Quanto mais você compra, mais economiza!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Zap className="h-4 w-4 text-green-500" />
            <span>Pagamento único • Sem mensalidades • Suporte brasileiro</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`relative hover:shadow-2xl transition-all duration-300 ${plan.popular ? "ring-2 ring-pink-500 scale-105" : ""} ${
                  selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1">
                    Mais Popular
                  </Badge>
                )}

                {plan.savings && <Badge className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 text-xs">{plan.savings}</Badge>}

                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <div className="text-sm text-gray-600 mt-1">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full h-12 text-lg font-semibold ${
                      plan.popular
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                    onClick={() => handleSelectPlan(plan.id, plan.name)}
                    disabled={selectedPlan === plan.id}
                  >
                    {selectedPlan === plan.id ? "Processando..." : "Comprar agora"}
                  </Button>

                  <p className="text-center text-sm text-gray-500">Pagamento único • Sem renovação automática</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Precisa de mais?</h2>
            <p className="text-xl text-gray-600">Já tem um plano? Adicione mais recursos com desconto especial para clientes!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addOnPlans.map((addon) => (
              <Card key={addon.id} className="hover:shadow-lg transition-shadow border-dashed border-2 border-pink-200">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-xl">{addon.name}</CardTitle>
                  <CardDescription>{addon.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900">{addon.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {addon.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                    onClick={() => handleSelectPlan(addon.id, addon.name)}
                  >
                    Adicionar ao meu plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Compare os planos</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Recursos</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">Básico</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">Premium</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">Professional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Número de listas</td>
                  <td className="px-6 py-4 text-center">1</td>
                  <td className="px-6 py-4 text-center">3</td>
                  <td className="px-6 py-4 text-center">8</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Itens por lista</td>
                  <td className="px-6 py-4 text-center">15</td>
                  <td className="px-6 py-4 text-center">30</td>
                  <td className="px-6 py-4 text-center">50</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Validade</td>
                  <td className="px-6 py-4 text-center">1 ano</td>
                  <td className="px-6 py-4 text-center">2 anos</td>
                  <td className="px-6 py-4 text-center">3 anos</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Custo por lista</td>
                  <td className="px-6 py-4 text-center text-gray-600">R$ 19,90</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">R$ 16,63</td>
                  <td className="px-6 py-4 text-center text-green-600 font-semibold">R$ 12,49</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perguntas Frequentes</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Por que pagamento único?</h3>
                <p className="text-gray-600">
                  Acreditamos que você não deve pagar mensalmente por algo que usa esporadicamente. Pague uma vez e use quando precisar!
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">O que acontece quando o plano expira?</h3>
                <p className="text-gray-600">
                  Suas listas continuam visíveis para quem tem o link, mas você não pode criar novas ou editar as existentes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Posso renovar meu plano?</h3>
                <p className="text-gray-600">Sim! Você pode renovar ou fazer upgrade a qualquer momento, mesmo após a expiração.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Como funcionam os add-ons?</h3>
                <p className="text-gray-600">
                  Add-ons são para clientes existentes que precisam de mais recursos. Têm preço especial e mesma validade do plano principal.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Posso fazer upgrade do meu plano?</h3>
                <p className="text-gray-600">Sim! Você paga apenas a diferença e ganha os recursos extras pelo tempo restante do seu plano.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tem reembolso?</h3>
                <p className="text-gray-600">Oferecemos reembolso total em até 7 dias após a compra, sem perguntas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-xl mb-8 opacity-90">Pague uma vez e organize seus eventos por anos!</p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Criar conta grátis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
