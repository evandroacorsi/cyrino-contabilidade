import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Importante para o link interno
import {
  Lock,
  FileText,
  Download,
  CreditCard,
  Calendar,
  HelpCircle,
  Calculator,
  BookOpen,
  FolderOpen,
  ExternalLink,
  ArrowRight,
  Building2
} from "lucide-react";

const AreaCliente = () => {

  // Novos botões baseados na sua imagem e solicitação
  const systemButtons = [
    {
      category: "Departamento Fiscal",
      title: "SIEG - XML das Notas",
      icon: FileText,
      url: "https://auth.sieg.com/login", // Substitua pelo link real
      external: true,
      color: "bg-[#E06E28] hover:bg-[#C55E1F]" // Laranja da imagem
    },
    {
      category: "Portal do Cliente",
      title: "ONVIO Portal do Cliente",
      icon: Lock,
      url: "https://onvio.com.br/clientcenter/pt/auth?r=%2Fhome",
      external: true,
      color: "bg-[#E06E28] hover:bg-[#C55E1F]"
    },
    {
      category: "MEI",
      title: "Cálculo Declaração IR MEI",
      icon: Calculator,
      url: "https://docs.google.com/spreadsheets/d/1LyfDch46blPsEmymso94t3ZaRJxMTpWD/edit?usp=sharing&ouid=115327238397815677828&rtpof=true&sd=true", // Link da calculadora
      external: true,
      color: "bg-[#E06E28] hover:bg-[#C55E1F]"
    },
    {
      category: "Gestão",
      title: "Livro Caixa",
      icon: BookOpen,
      url: "https://docs.google.com/spreadsheets/d/1oO3vFRLYKp9QnrOlQaXoZ9RhQ9Adn4Jc/edit?usp=sharing&ouid=106590145691195419619&rtpof=true&sd=true", // Link do Livro Caixa
      external: true,
      color: "bg-[#E06E28] hover:bg-[#C55E1F]"
    },
    {
      category: "Contábil",
      title: "Banco Cora",
      icon: Building2,
      url: "https://lp.cora.com.br/coraliados/?code=cyrino-contabilidade&n=Cyrino%20Contabilidade%20Ltda",
      external: true,
      color: "bg-[#E06E28] hover:bg-[#C55E1F]"
    },

    {
      category: "Arquivos",
      title: "Outros Arquivos", // Botão solicitado para a página interna
      icon: FolderOpen,
      url: "/arquivos", // Rota interna
      external: false,
      color: "bg-[#E06E28] hover:bg-[#C55E1F]"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section (Mantido) */}
      <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Lock className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Portal do Cliente
            </h1>
            <p className="text-lg md:text-xl opacity-95 leading-relaxed">
              Acesse seus documentos, boletos e informações contábeis de forma rápida e segura.
            </p>
          </div>
        </div>
      </section>


      {/* ----------------------------------------------------- */}

      {/* Info Section (Mantido Original) */}
      <section className="py-20 bg-background ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary mb-12">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Portal do Cliente Cyrino Contabilidade
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nossa plataforma exclusiva permite que você acesse todos os documentos e serviços contábeis em um só lugar, com total segurança e praticidade.
                </p>
                <Button
                  size="lg"
                  className="font-semibold text-lg px-8 py-6"
                  asChild
                >
                  <a
                    href="https://drive.cyrinocontabilidade.com.br/index.php/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar Portal do Cliente
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Se você ainda não possui credenciais de acesso, entre em contato conosco.
                </p>
              </CardContent>
            </Card>

            {/* Features Grid (Mantido Original) */}
            <div className="mb-12">
              <h3 className="font-heading text-2xl font-bold mb-8 text-center text-foreground">
                O Que Você Pode Fazer na Área do Cliente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: FileText,
                    title: "Documentos Contábeis",
                    description: "Acesse balancetes, demonstrativos e relatórios"
                  },
                  {
                    icon: Download,
                    title: "Download de Arquivos",
                    description: "Baixe guias, certidões e comprovantes"
                  },
                  {
                    icon: CreditCard,
                    title: "Boletos e Pagamentos",
                    description: "Visualize e emita segunda via de boletos"
                  },
                  {
                    icon: Calendar,
                    title: "Agenda de Obrigações",
                    description: "Acompanhe prazos e vencimentos importantes"
                  },
                  {
                    icon: FileText,
                    title: "Declarações e Guias",
                    description: "Acesse suas declarações fiscais e tributárias"
                  },
                  {
                    icon: HelpCircle,
                    title: "Suporte Online",
                    description: "Tire dúvidas direto com nossa equipe"
                  }
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-heading font-semibold mb-2 text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* --- NOVA SEÇÃO: BOTÕES DOS SISTEMAS (Redesenhada) --- */}
            <section className="py-16 bg-slate-50 border-b">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-10">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy-dark">
                      Acesso Rápido aos Sistemas
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Selecione a ferramenta que deseja acessar
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {systemButtons.map((btn, index) => (
                      <div key={index} className="h-full group">
                        {/* Wrapper Condicional para Link Externo ou Interno */}
                        {btn.external ? (
                          <a
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                          >
                            <Card className="h-full border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-orange-500/30 group-hover:-translate-y-1 overflow-hidden relative">
                              {/* Barra colorida lateral no hover */}
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                              <CardContent className="p-8 flex flex-col items-start justify-between h-full">
                                <div className="w-full">
                                  <div className="flex justify-between items-start mb-6">
                                    {/* Ícone com fundo suave */}
                                    <div className="h-14 w-14 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-inner group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                      <btn.icon className="h-7 w-7" />
                                    </div>
                                    <ExternalLink className="h-5 w-5 text-slate-300 group-hover:text-orange-400 transition-colors" />
                                  </div>

                                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 block">
                                    {btn.category}
                                  </span>
                                  <h3 className="font-heading text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                                    {btn.title}
                                  </h3>
                                </div>

                                <div className="mt-6 flex items-center text-sm font-medium text-orange-600 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                  Acessar agora <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                              </CardContent>
                            </Card>
                          </a>
                        ) : (
                          <Link to={btn.url} className="block h-full">
                            <Card className="h-full border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-navy-dark/30 group-hover:-translate-y-1 overflow-hidden relative">
                              {/* Barra colorida lateral no hover (Azul para interno) */}
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-navy-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                              <CardContent className="p-8 flex flex-col items-start justify-between h-full">
                                <div className="w-full">
                                  <div className="flex justify-between items-start mb-6">
                                    {/* Ícone Azul para diferenciar interno */}
                                    <div className="h-14 w-14 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-inner group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                      <btn.icon className="h-7 w-7" />
                                    </div>
                                  </div>

                                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 block">
                                    {btn.category}
                                  </span>
                                  <h3 className="font-heading text-xl font-bold text-slate-800 group-hover:text-navy-dark transition-colors">
                                    {btn.title}
                                  </h3>
                                </div>

                                <div className="mt-6 flex items-center text-sm font-medium text-navy-dark opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                  Ver arquivos <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Help Section (Mantido Original) */}
            <Card className="bg-muted">
              <CardContent className="p-8">
                <h3 className="font-heading text-xl font-bold mb-4 text-center text-foreground">
                  Precisa de Ajuda para Acessar?
                </h3>
                <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                  Se você esqueceu sua senha, não consegue acessar o portal ou é um novo cliente, nossa equipe está pronta para ajudar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                    <a href="https://wa.me/551832657176" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                    <a href="tel:+551832657176">
                      Ligar: (18) 3265-7176
                    </a>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                    <a href="mailto:contato@cyrinocontabilidade.com.br">
                      E-mail
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Notice (Mantido Original) */}
      <section className="py-12 bg-secondary text-secondary-foreground border-b-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="font-heading text-xl font-bold mb-3">
              Segurança e Privacidade
            </h3>
            <p className="opacity-90 leading-relaxed">
              Todos os dados são protegidos por criptografia SSL e armazenados em servidores seguros. Suas informações estão completamente protegidas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreaCliente;