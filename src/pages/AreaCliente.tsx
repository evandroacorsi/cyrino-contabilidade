import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lock, FolderOpen, ArrowRight, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SEO from "@/components/SEO";
import { fetchPublicClientTools, type ClientTool } from "@/lib/clientTools";
import { useEffect, useState } from "react";

type SystemButton = ClientTool & {
  icon?: LucideIcon;
};

const fallbackTools: SystemButton[] = [
  {
    id: "outros-arquivos",
    category: "Arquivos",
    title: "Outros Arquivos",
    image: "",
    icon: FolderOpen,
    url: "/arquivos",
    external: false,
    order: 1,
    active: true,
  },
];

type SystemCardButton = {
  id: string;
  category: string;
  title: string;
  image: string;
  icon?: LucideIcon;
  url: string;
  external: boolean;
};

const AreaCliente = () => {
  const [systemButtons, setSystemButtons] = useState<SystemButton[]>(fallbackTools);

  useEffect(() => {
    fetchPublicClientTools()
      .then((tools) => {
        const nextTools = tools.map((tool) => ({
          ...tool,
          icon: tool.image ? undefined : FolderOpen,
        }));
        setSystemButtons(nextTools.length ? nextTools : fallbackTools);
      })
      .catch(() => setSystemButtons(fallbackTools));
  }, []);

  return (
    <>
      <SEO
        title="Área do Cliente | Cyrino Contabilidade"
        description="Acesse o portal do cliente da Cyrino Contabilidade. Documentos, notas fiscais, IRPF, sistemas contábeis e serviços exclusivos em um só lugar."
        url="https://www.cyrinocontabilidade.com.br/area-cliente"
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Lock className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
                Portal do Cliente
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-5 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* --- NOVA SEÇÃO: BOTÕES DOS SISTEMAS --- */}
              <section className="py-8 bg-slate-50 border-b rounded-xl mb-8">
                <div className="container mx-auto px-2">
                  <div className="text-center mb-8">
                    <p className="text-muted-foreground mt-2 mb-14">
                      Selecione abaixo a ferramenta que deseja acessar:
                    </p>
                  </div>

                  {/* Grid customizado para 7 colunas em telas grandes (lg:grid-cols-7) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {systemButtons.map((btn) => (
                      <div key={btn.id} className="h-full group">
                        {btn.external ? (
                          <a
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                          >
                            <SystemCardContent btn={btn} isInternal={false} />
                          </a>
                        ) : (
                          <Link to={btn.url} className="block h-full">
                            <SystemCardContent btn={btn} isInternal={true} />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Portal Info Section */}
              <Card className="border-2 border-primary mb-12">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-foreground">
                    Portal do Cliente Cyrino Contabilidade
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Nossa plataforma exclusiva permite que você acesse todos os
                    documentos e serviços contábeis em um só lugar, com total
                    segurança e praticidade.
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
                    Se você ainda não possui credenciais de acesso, entre em
                    contato conosco.
                  </p>
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card className="bg-muted">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-bold mb-4 text-center text-foreground">
                    Precisa de Ajuda para Acessar?
                  </h3>
                  <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                    Se você esqueceu sua senha, não consegue acessar o portal ou
                    é um novo cliente, nossa equipe está pronta para ajudar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a
                        href="https://wa.me/551832657176"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href="tel:+551832657176">Ligar: (18) 3265-7176</a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
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

        {/* Security Notice */}
        <section className="py-12 bg-secondary text-secondary-foreground border-b-4 border-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="font-heading text-xl font-bold mb-3">
                Segurança e Privacidade
              </h3>
              <p className="opacity-90 leading-relaxed">
                Todos os dados são protegidos por criptografia SSL e armazenados
                em servidores seguros. Suas informações estão completamente
                protegidas.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Componente auxiliar para manter o código limpo e os cards menores/padronizados
const SystemCardContent = ({
  btn,
  isInternal,
}: {
  btn: SystemCardButton;
  isInternal: boolean;
}) => {
  const Icon = btn.icon ?? FolderOpen;

  return (
    <Card
      className={`h-full border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-md ${isInternal ? "group-hover:border-navy-dark/40" : "group-hover:border-orange-500/40"} group-hover:-translate-y-1 overflow-hidden relative`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${isInternal ? "bg-navy-dark" : "bg-orange-500"}`}
      ></div>

      {/* Paddings e tamanhos reduzidos para caber os 7 na tela */}
      <CardContent className="p-4 flex flex-col items-center text-center justify-between h-full">
        <div className="w-full flex flex-col items-center">
          {/* Container da Imagem ou Ícone */}
          <div className="h-16 w-16 mb-3 rounded-lg bg-slate-50 flex items-center justify-center p-2 group-hover:bg-slate-100 transition-colors duration-300">
            {btn.image ? (
              <img
                src={btn.image}
                alt={btn.title}
                className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              // Fallback para ícone caso não tenha imagem (ex: Outros Arquivos)
              <Icon
                className={`h-6 w-6 ${isInternal ? "text-navy-dark" : "text-orange-500"}`}
              />
            )}
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block line-clamp-1">
            {btn.category}
          </span>
          <h3
            className={`font-heading text-sm font-bold text-slate-800 transition-colors leading-tight ${isInternal ? "group-hover:text-navy-dark" : "group-hover:text-orange-600"}`}
          >
            {btn.title}
          </h3>
        </div>

        <div
          className={`mt-3 flex items-center justify-center text-[11px] font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${isInternal ? "text-navy-dark" : "text-orange-600"}`}
        >
          {isInternal ? "Ver arquivos" : "Acessar"}
          {!isInternal && <ExternalLink className="ml-1 h-3 w-3" />}
          {isInternal && <ArrowRight className="ml-1 h-3 w-3" />}
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaCliente;
