import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import {
  RefreshCw,
  FileText,
  Calculator,
  TrendingUp,
  Shield,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Building2,
  Briefcase,
} from "lucide-react";
import SEO from "@/components/SEO";

const Solucoes = () => {
  const solutions = [
    {
      icon: RefreshCw,
      title: "Migração de Contabilidade",
      description:
        "Processo simples e rápido para trocar de contador. Cuidamos de toda a transferência de dados e documentos sem complicações.",
      features: [
        "Análise completa da situação atual",
        "Transferência segura de documentos",
        "Regularização de pendências",
        "Sem interrupção nas obrigações fiscais",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      title: "Declaração de Imposto de Renda (IRPF)",
      description:
        "Declaração completa com análise detalhada para maximizar restituições e evitar problemas com a Receita Federal.",
      features: [
        "Análise de todas as deduções possíveis",
        "Importação automática de dados",
        "Verificação de pendências",
        "Acompanhamento até a restituição",
      ],
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Building2,
      title: "Migração de MEI para ME",
      description:
        "Sua empresa cresceu? Fazemos a transição do MEI para Microempresa de forma rápida e sem complicações.",
      features: [
        "Análise do melhor momento para migrar",
        "Definição do regime tributário ideal",
        "Regularização de todas as obrigações",
        "Suporte na adaptação aos novos processos",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Calculator,
      title: "Assessoria Contábil e Fiscal",
      description:
        "Gestão completa da contabilidade da sua empresa com foco em compliance e otimização tributária.",
      features: [
        "Escrituração contábil mensal",
        "Apuração de impostos",
        "Emissão de guias e certidões",
        "Balancetes e demonstrativos",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Regularização de Empresa",
      description:
        "Solução de pendências fiscais, trabalhistas e contábeis para manter sua empresa em conformidade.",
      features: [
        "Levantamento de todas as pendências",
        "Negociação de débitos",
        "Emissão de certidões negativas",
        "Prevenção de problemas futuros",
      ],
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Consultoria Financeira",
      description:
        "Planejamento estratégico e análise financeira para aumentar a rentabilidade do seu negócio.",
      features: [
        "Análise de fluxo de caixa",
        "Planejamento tributário",
        "Redução de custos operacionais",
        "Indicadores de performance",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Departamento Pessoal",
      description:
        "Gestão completa da folha de pagamento e obrigações trabalhistas da sua empresa.",
      features: [
        "Folha de pagamento mensal",
        "Admissão e demissão de funcionários",
        "Férias e 13º salário",
        "eSocial e obrigações acessórias",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Briefcase,
      title: "Contabilidade para Profissionais Liberais",
      description:
        "Soluções especializadas para médicos, advogados, dentistas e outros profissionais autônomos.",
      features: [
        "Análise do melhor regime tributário",
        "Planejamento para redução de impostos",
        "Gestão de recebimentos",
        "Declaração de IRPF otimizada",
      ],
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <>
      <SEO
        title="Soluções Contábeis | Cyrino Contabilidade"
        description="Conheça nossas soluções contábeis: assessoria fiscal, departamento pessoal, IRPF, migração de MEI e muito mais. Atendimento em todo o Brasil."
        url="https://www.cyrinocontabilidade.com.br/solucoes"
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
                Soluções Contábeis Completas
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-95 leading-relaxed">
                Serviços personalizados para cada necessidade do seu negócio.
                Transforme contabilidade em estratégia.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${solution.color}`}
                  ></div>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`p-4 bg-gradient-to-br ${solution.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <solution.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {solution.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full group/btn" asChild>
                      <a
                        href="https://wa.me/551832657176"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="!w-6 !h-6" />
                        Falar com um Contador
                        <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted border-b-4 border-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Não Encontrou o Que Procura?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Cada empresa tem necessidades únicas. Entre em contato conosco e
                vamos criar uma solução personalizada para o seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="font-semibold" asChild>
                  <Link to="/contato">Solicitar Orçamento Personalizado</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                  asChild
                >
                  <a
                    href="https://wa.me/551832657176"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="!w-6 !h-6" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Solucoes;
