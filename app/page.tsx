import { ArrowRight, Gift, Share2, ShoppingCart, Star, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="h-8 w-8 text-pink-600" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Meus Presentes</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4 md:space-x-8">
            <a href="#beneficios" className="text-sm sm:text-md md:text-xl text-gray-600 hover:text-pink-600 transition-colors">
              Benefícios
            </a>
            <a href="#como-funciona" className="text-sm sm:text-md md:text-xl text-gray-600 hover:text-pink-600 transition-colors">
              Como Funciona
            </a>
            <a href="#planos" className="text-sm sm:text-md md:text-xl text-gray-600 hover:text-pink-600 transition-colors">
              Preços
            </a>
            <a href="#depoimentos" className="text-sm sm:text-md md:text-xl text-gray-600 hover:text-pink-600 transition-colors">
              Depoimentos
            </a>
          </nav>
          <Link href="/auth">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">Criar minha lista</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Monte sua lista de presentes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">personalizada</span> para qualquer ocasião
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Casamento, chá de casa nova, aniversário? Com apenas alguns cliques, compartilhe sua lista com quem quiser.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              Comece agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <div className="mt-8 sm:mt-12 relative px-4 sm:px-0">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 max-w-2xl mx-auto border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Lista de Casamento - João & Ana</h3>
                <Share2 className="h-5 w-5 text-pink-600" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Jogo de Panelas Premium</span>
                  <span className="text-pink-600 font-semibold">R$ 299</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 line-through">Liquidificador</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Aspirador Robô</span>
                  <span className="text-pink-600 font-semibold">R$ 899</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que escolher o Meus Presentes?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A maneira mais fácil e elegante de organizar e compartilhar suas listas de presentes
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fácil de usar e compartilhar</h3>
                <p className="text-gray-600">
                  Interface intuitiva que permite criar e compartilhar listas em minutos. Seus convidados acessam facilmente pelo link.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Links direto para compra</h3>
                <p className="text-gray-600">
                  Adicione links diretos das lojas online. Seus convidados compram com um clique e você evita presentes duplicados.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ideal para qualquer ocasião</h3>
                <p className="text-gray-600">
                  Casamento, aniversário, chá de bebê, formatura... Crie listas personalizadas para todos os momentos especiais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como funciona?</h2>
            <p className="text-xl text-gray-600">Em apenas 3 passos simples, sua lista estará pronta para compartilhar</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Crie sua conta</h3>
              <p className="text-gray-600">Cadastre-se gratuitamente em segundos. Apenas nome, email e senha.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Monte sua lista com links dos presentes</h3>
              <p className="text-gray-600">
                Adicione os presentes desejados com links das lojas e valores. Organize tudo de forma visual e atrativa.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compartilhe com seus convidados</h3>
              <p className="text-gray-600">
                Envie o link da sua lista por WhatsApp, email ou redes sociais. Acompanhe o que já foi comprado em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pague uma vez, use por anos!</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sem mensalidades! Escolha seu plano e organize seus eventos quando precisar. Quanto mais você compra, mais economiza!
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Plano Básico */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow relative">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Básico</h3>
                <p className="text-gray-600 mb-6">Perfeito para um evento especial</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">R$ 19,90</span>
                  <div className="text-sm text-gray-600 mt-1">pagamento único</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">1 lista de presentes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Até 15 itens por lista</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Válido por 1 ano</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Suporte por email</span>
                  </li>
                </ul>
                <Link href="/planos">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Comprar agora</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow relative ring-2 ring-pink-500 scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
              <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">Economize R$ 9,80</div>
              <CardContent className="p-8 text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <p className="text-gray-600 mb-6">Ideal para múltiplos eventos</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">R$ 49,90</span>
                  <div className="text-sm text-gray-600 mt-1">pagamento único</div>
                  <div className="text-xs text-green-600 font-medium">R$ 16,63 por lista</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">3 listas de presentes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Até 30 itens por lista</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Válido por 2 anos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Suporte prioritário</span>
                  </li>
                </ul>
                <Link href="/planos">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                    Comprar agora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Professional */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">Economize R$ 59,30</div>
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                <p className="text-gray-600 mb-6">Para organizadores profissionais</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">R$ 99,90</span>
                  <div className="text-sm text-gray-600 mt-1">pagamento único</div>
                  <div className="text-xs text-green-600 font-medium">R$ 12,49 por lista</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">8 listas de presentes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Até 50 itens por lista</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Válido por 3 anos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Suporte 24/7</span>
                  </li>
                </ul>
                <Link href="/planos">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Comprar agora</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Pagamento único • Sem renovação automática • Reembolso em 7 dias</p>
            <Link href="/planos">
              <Button variant="outline" className="text-pink-600 border-pink-600 hover:bg-pink-50 bg-transparent">
                Ver comparação completa dos planos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos usuários dizem</h2>
            <p className="text-xl text-gray-600">Milhares de pessoas já organizaram suas listas conosco</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Organizei minha lista de casamento aqui e foi perfeito! Os convidados adoraram a facilidade e não tivemos nenhum presente
                  duplicado."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-pink-600 font-semibold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maria Clara</p>
                    <p className="text-gray-500 text-sm">Noiva</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Usei para o chá de casa nova e foi incrível! Super fácil de usar e o visual ficou lindo. Recomendo muito!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-semibold">AS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana Silva</p>
                    <p className="text-gray-500 text-sm">Arquiteta</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Criei uma lista para o aniversário do meu filho e todos os amigos conseguiram acessar facilmente. Muito prático!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-semibold">RS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Roberto Santos</p>
                    <p className="text-gray-500 text-sm">Pai de família</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto para criar sua lista de presentes?</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Pague uma vez e organize seus eventos por anos! Sem mensalidades, sem complicação.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto font-semibold"
            >
              Começar agora - É grátis!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="h-6 w-6 text-pink-400" />
                <span className="text-xl font-bold">Meus Presentes</span>
              </div>
              <p className="text-gray-400">A plataforma mais fácil para criar e compartilhar listas de presentes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Exemplos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Meus Presentes. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
