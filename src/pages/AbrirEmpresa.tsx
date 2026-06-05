import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import {
  FileSearch,
  Calculator,
  FileCheck,
  Headphones,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import SEO from "@/components/SEO";

const AbrirEmpresa = () => {
  const steps = [
    {
      icon: FileSearch,
      title: "1. Consultoria Inicial",
      description:
        "Análise completa do seu negócio, definição do tipo de empresa ideal e orientação sobre a melhor estrutura jurídica.",
    },
    {
      icon: Calculator,
      title: "2. Análise Tributária",
      description:
        "Estudo detalhado para escolher o regime tributário mais vantajoso: Simples Nacional, Lucro Presumido ou Lucro Real.",
    },
    {
      icon: FileCheck,
      title: "3. Registro e CNPJ",
      description:
        "Providenciamos toda a documentação, registros na Junta Comercial e emissão do CNPJ junto à Receita Federal.",
    },
    {
      icon: Headphones,
      title: "4. Suporte Pós-Abertura",
      description:
        "Acompanhamento contínuo para emissão de notas fiscais, folha de pagamento e todas as obrigações mensais.",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Agilidade no Processo",
      description:
        "Processos digitalizados que aceleram a abertura da sua empresa.",
    },
    {
      icon: Shield,
      title: "Segurança Jurídica",
      description:
        "Todos os registros e documentos em conformidade com a legislação.",
    },
    {
      icon: Calculator,
      title: "Economia Tributária",
      description:
        "Escolha do regime tributário que gera menos impostos para seu negócio.",
    },
    {
      icon: Headphones,
      title: "Suporte Contínuo",
      description:
        "Atendimento personalizado antes, durante e após a abertura.",
    },
  ];

  return (
    <>
      <SEO
        title="Abertura de Empresa Online | Cyrino Contabilidade"
        description="Abra sua empresa com segurança e sem burocracia. Cuidamos de todo o processo de abertura de CNPJ, escolha do regime tributário e suporte completo para seu negócio."
        url="https://www.cyrinocontabilidade.com.br/abrir-empresa"
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
                Abertura de Empresa com Suporte Completo e Segurança
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-95 leading-relaxed">
                Transforme seu sonho em realidade. Cuidamos de toda a burocracia
                para você focar no que realmente importa: seu negócio.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-xl"
                asChild
              >
                <a
                  href="https://wa.me/551832657176"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <FaWhatsapp className="!w-6 !h-6" />
                  Solicitar Abertura de Empresa
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Como Funciona o Processo
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Passo a passo simples e transparente para abrir sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-6 p-6 bg-primary/10 rounded-full w-24 h-24 mx-auto flex items-center justify-center border-2 border-primary">
                    <step.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Benefícios de Abrir com a Cyrino
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Vantagens exclusivas para quem escolhe nossos serviços
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 p-3 bg-primary rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <benefit.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-3 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Documentos Necessários
                </h2>
                <p className="text-lg text-muted-foreground">
                  Prepare estes documentos para agilizar o processo
                </p>
              </div>

              <Card className="bg-muted border-l-4 border-l-primary">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-heading text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                        <CheckCircle2 className="text-primary" size={20} />
                        Pessoa Física
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>RG e CPF dos sócios</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Comprovante de residência atualizado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Certidão de casamento (se aplicável)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Título de eleitor</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                        <CheckCircle2 className="text-primary" size={20} />
                        Empresa
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Definição da atividade principal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Nome empresarial desejado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Endereço comercial</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Capital social inicial</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary text-secondary-foreground border-b-4 border-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Clock className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Pronto para Começar?
              </h2>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                Entre em contato agora mesmo e receba uma consultoria gratuita
                para abertura da sua empresa. Nossa equipe está pronta para
                ajudar você a dar o primeiro passo rumo ao sucesso!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 font-semibold text-lg px-8 py-6"
                  asChild
                >
                  <a
                    href="https://wa.me/551832657176"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary transition-colors"
                  >
                    <FaWhatsapp className="!w-6 !h-6" />
                    Falar com um Contador
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/contato">Solicitar orçamento</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AbrirEmpresa;
