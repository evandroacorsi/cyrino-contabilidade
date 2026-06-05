import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Lightbulb,
  Shield,
} from "lucide-react";
import rodrigoCyrino from "@/assets/rodrigo-cyrino.jpg";
import about from "@/assets/about.jpg";
import SEO from "@/components/SEO";
const Sobre = () => {
  const values = [
    {
      icon: Heart,
      title: "Comprometimento",
      description:
        "Dedicação total ao sucesso de cada cliente, tratando cada negócio como se fosse nosso.",
    },
    {
      icon: Shield,
      title: "Ética e Transparência",
      description:
        "Honestidade em todas as relações, com comunicação clara e transparente.",
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description:
        "Processos digitalizados e soluções modernas para maior eficiência.",
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description:
        "Cada cliente recebe atenção exclusiva e soluções sob medida.",
    },
    {
      icon: Award,
      title: "Excelência",
      description:
        "Busca constante pela qualidade superior em todos os serviços prestados.",
    },
    {
      icon: Target,
      title: "Resultados",
      description:
        "Foco em gerar valor real e resultados mensuráveis para nossos clientes.",
    },
  ];

  return (
    <>
      <SEO
        title="Sobre a Cyrino Contabilidade | Nossa história e valores"
        description="Conheça a história da Cyrino Contabilidade, nossa missão, visão e valores. Atendimento personalizado e soluções contábeis estratégicas para empresas."
        url="https://www.cyrinocontabilidade.com.br/sobre"
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
                Sobre a Cyrino Contabilidade
              </h1>
              <p className="text-lg md:text-xl opacity-95 leading-relaxed">
                Transformando a gestão contábil em vantagem competitiva para
                empresas em todo o Brasil
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex w-full justify-center align-center mb-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Nossa História
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 lg:order-1">
                <img
                  src={about}
                  alt="Equipe Cyrino Contabilidade"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>

              <div className="order-1 lg:order-2">
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    A Cyrino Contabilidade nasceu da visão de transformar a
                    contabilidade tradicional em um serviço estratégico e
                    acessível para empresas de todos os portes.
                  </p>
                  <p>
                    Com sede em Rancharia-SP, atendemos clientes em todo o
                    Brasil, oferecendo soluções personalizadas que combinam
                    expertise técnica com atendimento humanizado.
                  </p>
                  <p>
                    Nossa equipe é formada por profissionais qualificados e
                    apaixonados por ajudar empresários a alcançarem seus
                    objetivos, sempre com ética, transparência e compromisso com
                    resultados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="border-t-4 border-t-primary hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">
                    Missão
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Simplificar a gestão contábil e fiscal das empresas,
                    oferecendo soluções personalizadas que geram valor e
                    permitem que nossos clientes foquem no crescimento de seus
                    negócios.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-primary hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">
                    Visão
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser referência em assessoria contábil, reconhecida pela
                    excelência no atendimento, inovação em processos e
                    compromisso com o sucesso de nossos clientes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-primary hover:shadow-xl transition-all">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">
                    Valores
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ética, transparência, comprometimento, inovação e
                    atendimento personalizado guiam todas as nossas ações e
                    decisões.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values Grid */}
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
                Nossos Valores em Ação
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div className=" flex flex-col gap-4 pb-6 pl-6 pr-6 bg-background rounded-lg border border-border hover:border-primary transition-all animate-fade-in">
                    <div
                      key={index}
                      className="flex items-center gap-4 pt-6"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold mb-2 text-foreground">
                          {value.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Responsável Técnico
                </h2>
                <p className="text-lg text-muted-foreground">
                  Conheça o profissional que lidera nossa equipe
                </p>
              </div>

              <Card className="overflow-hidden hover:shadow-2xl transition-all">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-4 border-primary">
                  <div className="md:col-span-2 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <img
                      src={rodrigoCyrino}
                      alt="Rodrigo Cyrino Ribeiro"
                      className="w-96 h-96 object-cover shadow-xl"
                    />
                  </div>
                  <CardContent className="md:col-span-3 p-8 flex flex-col justify-center">
                    <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">
                      Rodrigo Cyrino Ribeiro
                    </h3>
                    <p className="text-primary font-semibold mb-4">
                      CRC 1SP 289664
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Contador experiente e apaixonado por ajudar empresários a
                      alcançarem seus objetivos através de uma gestão contábil
                      estratégica e eficiente.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Com anos de experiência no mercado, Rodrigo lidera a
                      equipe Cyrino com foco em excelência, inovação e
                      atendimento personalizado, garantindo que cada cliente
                      receba as melhores soluções para seu negócio.
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary text-secondary-foreground border-b-4 border-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Vamos Crescer Juntos?
              </h2>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                Entre em contato e descubra como a Cyrino Contabilidade pode
                transformar a gestão do seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 font-semibold text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/contato">Fale Conosco</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground text-secondary hover:bg-primary-foreground hover:text-primary font-semibold text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/solucoes">Conheça Nossas Soluções</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Sobre;
