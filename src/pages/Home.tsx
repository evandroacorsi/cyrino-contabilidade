import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import CounterCard from "../components/CounterCard";
import { Instagram } from "lucide-react";
import SEO from "@/components/SEO";
import {
  Building2,
  RefreshCw,
  FileText,
  TrendingUp,
  ArrowRight,
  Star,
  MessageCircle,
  Handshake,
  BarChart3,
  Heart,
  ExternalLink,
} from "lucide-react";
import heroBackground from "@/assets/hero-background.webp";
import googleBadge from "@/assets/google-review.webp";
import artInstagram from "@/assets/art-instagram.webp";
import YoutubeVideos from "@/components/YoutubeVideos";
import TestimonialItem from "@/components/TestimonialItem";
import ProgressiveImage from "@/components/ProgressiveImageProps";

// --- SUB-COMPONENTE ---

const Home = () => {
  // --- LÓGICA DO CARROSSEL ---
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && !isPaused && carouselRef.current) {
        const slider = carouselRef.current;
        slider.scrollLeft += 1;

        if (slider.scrollLeft >= slider.scrollWidth / 2 - 10) {
          slider.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isDragging, isPaused]);

  // --- HANDLERS MOUSE (Desktop) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- HANDLERS TOUCH (Mobile) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsPaused(true); // Para o auto-scroll imediatamente
    setIsDragging(true);
    // Pega a posição do primeiro dedo
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false); // Volta a rodar quando solta o dedo
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do arraste
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  // ---------------------------------------

  const services = [
    {
      icon: Building2,
      title: "Abertura de Empresa",
      description:
        "Processo completo e personalizado para iniciar seu negócio com segurança e agilidade.",
      link: "/abrir-empresa",
    },
    {
      icon: RefreshCw,
      title: "Migração de Contabilidade",
      description:
        "Transição rápida e sem complicações. Economize tempo e dinheiro no processo.",
      link: "/solucoes",
    },
    {
      icon: FileText,
      title: "Declaração IRPF",
      description:
        "Da coleta de documentos à entrega, com maximização de deduções.",
      link: "/solucoes",
    },
    {
      icon: TrendingUp,
      title: "Assessoria Fiscal",
      description:
        "Planejamento tributário estratégico para reduzir custos e aumentar competitividade.",
      link: "/solucoes",
    },
  ];

  const testimonials = [
    {
      name: "PROPETEC Consultoria",
      text: "A Cyrino Contabilidade virou bússola no nosso caminho. Ágil, certeira, humana. Não é só cálculo, é cuidado. Com eles, até o caos fiscal ganha ordem. Confiança não se pede, se constrói e eles construíram a nossa. Recomendamos de olhos fechados e coração tranquilo.",
      link: "https://share.google/bsHwSmH0u8w6QKcEs",
      rating: 5,
      date: "2025",
    },
    {
      name: "Cleide Viana",
      text: "Gostaria de parabenizar toda a equipe pelo excelente trabalho e dedicação que têm demonstrado. É inspirador ver o comprometimento de vocês em oferecer serviços de alta qualidade e sempre buscar a excelência em cada projeto...",
      link: "https://share.google/o7tIGK4MHvIyYhtTC",
      rating: 5,
      date: "2025",
    },
    {
      name: "Renato Camacho",
      text: "Minha experiência com a CYRINO CONTABILIDADE foi excelente! Desde o início, fui muito bem atendido por uma equipe atenciosa e profissional. Eles cumpriram todos os prazos com precisão, o que trouxe uma grande tranquilidade para a nossa empresa.",
      link: "https://share.google/s79g5lDpW92uLxgKw",
      rating: 5,
      date: "2025",
    },
    {
      name: "Lilliane de Souza",
      text: "Eu recomendo Muito!\n\nEscritório super atencioso, estão sempre postos ajudar quando precisamos de forma rápida! Além de dar dicas valiosas para alavancar nosso negócio!! Parabéns a toda equipe E Rodrigo!",
      link: "https://share.google/bPwRe7yb2TqqAPOPH",
      rating: 5,
      date: "2025",
    },
    {
      name: "William Rodrigues",
      text: "Pessoal do escritório muito atencioso, o proprietário Rodrigo sempre atencioso e busca explicar detalhes de todo a documentação necessária.\n\nEmpresa nota 10.",
      link: "https://share.google/CEZnHe8g5BgYxoPdF",
      rating: 5,
      date: "2025",
    },
    {
      name: "Kalinca Tavares",
      text: "Profissionais competentes, sempre com zelo e atenção no atendimento de nós clientes!!! Muito obrigada Cyrino!! Foram uma indicação e indicaria sempre vocês!! Sucesso sempre",
      link: "https://share.google/lwVHytsXWtusW7hAM",
      rating: 5,
      date: "2024",
    },
  ];

  return (
    <>
      <SEO
        title="Cyrino Contabilidade | Clareza que faz sua empresa crescer"
        description="Assessoria contábil completa com linguagem simples. Abertura de empresa, IRPF, MEI e planejamento fiscal com atendimento em Rancharia-SP, Presidente Prudente, Dracena, Tupi Paulista, Panorama, Presidente Epitácio, Presidente Venceslau, Martinópolis e região, além de atendimento online para todo o Brasil."
        url="https://www.cyrinocontabilidade.com.br/"
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
          {/*
        --- CAMADA 1: O Background Progressivo ---
        Esta div ocupa todo o espaço e contém a imagem.
        Substituímos as classes de background CSS (bg-cover, bg-center)
        pelas classes de objeto de imagem (object-cover, object-center).
      */}
          <div className="absolute inset-0 z-0">
            <ProgressiveImage
              src={heroBackground}
              // ⚠️ ATENÇÃO: Crie esta imagem na pasta public ⚠️
              placeholder="/hero-bg-blur.webp"
              // Aplicamos as regras de posicionamento que estavam no CSS aqui na imagem
              className="w-full h-full object-cover object-[75%_top] lg:object-[center_top]"
            />
          </div>

          {/*
        --- CAMADA 2: O Overlay de Gradiente ---
        Como removemos o backgroundImage: linear-gradient(...) da section principal,
        precisamos recriá-lo aqui como uma camada por cima da imagem, mas abaixo do conteúdo.
      */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(135deg, rgba(255, 96, 55, 0.55), rgba(13, 39, 80, 0.95))`,
            }}
          ></div>

          {/* --- CONTEÚDO (Mantido igual, com z-10 para ficar por cima) --- */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight">
                Clareza que faz sua empresa crescer.
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-95 animate-fade-in leading-relaxed">
                Aqui, a contabilidade fala a sua língua.
                <span className="block md:inline">
                  <span className="hidden md:inline">&nbsp;</span>A gente
                  explica, orienta e cuida dos seus números pra você ter tempo e
                  paz pra focar no que realmente faz
                  <br /> sua empresa avançar.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                  asChild
                >
                  <a
                    href="https://wa.me/551832657176"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <FaWhatsapp className="!w-6 !h-6" />
                    Falar com um contador Cyrino
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/contato">Quero entender meu negócio</Link>
                </Button>
              </div>
              <p className="text-white text-sm mt-4 opacity-90">
                Contabilidade sem enrolação, sem “contabilês” e com resultados
                reais.
              </p>
            </div>
          </div>

          {/* Elementos decorativos (mantidos com z-index baixo implícito) */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0"></div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Nossos Principais Serviços
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-95 animate-fade-in leading-relaxed">
                Soluções contábeis completas
                <span className="block md:inline">
                  <span className="hidden md:inline">&nbsp;</span>
                  para o crescimento do seu negócio
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                    >
                      Saiba mais <ArrowRight size={16} />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                O que faz a Cyrino ser diferente não é o que a gente faz...
                <br />
                <span className="text-accent">
                  É como a gente explica o que faz.
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A gente sabe que contabilidade pode parecer complicada — mas não
                precisa ser. Aqui, cada número é explicado, cada decisão é
                transparente e cada cliente entende o que está acontecendo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: MessageCircle,
                  title: "Comunicação simples",
                  desc: "A gente fala sem “contabilês”. Você entende tudo.",
                },
                {
                  icon: Handshake,
                  title: "Parceria de verdade",
                  desc: "Estamos do seu lado, acompanhando cada etapa.",
                },
                {
                  icon: BarChart3,
                  title: "Planejamento com propósito",
                  desc: "Cuidamos dos números para você focar no crescimento.",
                },
                {
                  icon: Heart,
                  title: "Cuidado humano",
                  desc: "Pessoas atendendo pessoas, com empatia e responsabilidade.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center animate-fade-in"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 text-primary rounded-xl flex items-center justify-center shadow-inner">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Como funciona na prática
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Um passo a passo claro, transparente e sem complicação.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-muted rounded-full"></div>
              <div className="space-y-14">
                {[
                  {
                    title: "Primeiro contato",
                    desc: "Você fala sobre seu negócio, suas metas e suas preocupações. A gente escuta de verdade.",
                  },
                  {
                    title: "Diagnóstico claro",
                    desc: "Avaliamos sua situação e explicamos tudo de forma simples — sem termos técnicos.",
                  },
                  {
                    title: "Planejamento personalizado",
                    desc: "Criamos uma estratégia ideal para sua empresa pagar o justo, evitar riscos e crescer.",
                  },
                  {
                    title: "Acompanhamento contínuo",
                    desc: "Você entende cada número. Nós traduzimos tudo para você sem complicar.",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-start md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-white font-bold rounded-lg shadow-md md:hidden">
                      {i + 1}
                    </div>
                    <div className="hidden md:flex flex-col items-center w-1/2 relative">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl font-bold shadow-lg">
                        {i + 1}
                      </div>
                    </div>
                    <div className="bg-muted p-6 rounded-2xl shadow-sm w-full md:w-1/2 md:mt-0 md:mb-0">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="px-10 py-6 text-lg shadow-md"
                asChild
              >
                <Link to="/contato">Quero começar com a Cyrino</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section - DRAGGABLE & INFINITE */}
        <section className="py-20 bg-secondary text-secondary-foreground overflow-hidden select-none">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                O Que Dizem Nossos Clientes
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-95 animate-fade-in leading-relaxed">
                Depoimentos de quem confia na
                <span className="block md:inline">
                  <span className="hidden md:inline">&nbsp;</span>
                  Cyrino Contabilidade
                </span>
              </p>
            </div>
          </div>

          <div className="relative w-full flex flex-col items-center justify-center">
            {/* Gradientes Laterais */}
            <div className="pointer-events-none absolute z-10 inset-y-0 left-0 w-1/6 bg-gradient-to-r from-secondary to-transparent"></div>
            <div className="pointer-events-none absolute z-10 inset-y-0 right-0 w-1/6 bg-gradient-to-l from-secondary to-transparent"></div>

            {/* Container com Ref e Eventos de Mouse/Touch */}
            <div
              ref={carouselRef}
              className={`
              flex w-full overflow-x-hidden gap-8 px-4 py-10 items-stretch
              ${isDragging ? "cursor-grabbing" : "cursor-grab"}
            `}
              // Eventos de Mouse (Desktop)
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              // Eventos de Touch (Mobile) - ADICIONADOS
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="
                  group block
                  transition-all duration-300
                  hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1
                "
                >
                  <TestimonialItem
                    testimonial={testimonial}
                    googleBadge={googleBadge}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Google Badge */}
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-white font-semibold">5.0 no Google</span>
            </div>
          </div>

          <div className="text-center pt-8 rounded-lg z-10">
            <h3 className="font-heading text-3xl font-bold mb-4 text-white">
              Deixe Seu Feedback
            </h3>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              Sua opinião é muito importante para nós! Compartilhe sua
              experiência com a <br />
              Cyrino Contabilidade e ajude outros clientes a conhecerem nosso
              trabalho.
            </p>

            {/* CORREÇÃO APLICADA: Usando 'asChild' e garantindo que o <a> tenha todas as classes de estilo do Button */}
            <Button
              // A classe 'size-lg' é interna, mas vamos replicar os estilos visuais no <a>
              // size="lg" (removido para evitar conflito de classes, os estilos visuais foram movidos para o <a>)
              className="bg-primary hover:bg-primary/90 text-white shadow-lg z-10"
              asChild
            >
              <a
                // Adicionado as classes base e de tamanho para garantir que o <a> se pareça e se comporte como o Button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-12 px-8 py-3" // h-12 px-8 py-3 são as classes para size="lg"
                href="https://www.google.com/search?sca_esv=247386aaf4f72303&sxsrf=AE3TifOLCebl9OAefWF_gj8zfepwccOc0g:1763733933935&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E75EV-NeO89PAz5kps726nbxKx1y6fotLSUTgtpXMVt54YvprdAhSHaK_Z7znm1AaQ5U8tG_xTyEnWmJhCJdhXEFpm9uBR5jUBT8qeyVFxszTbiyow%3D%3D&q=CYRINO+CONTABILIDADE+Coment%C3%A1rios&sa=X&ved=2ahUKEwjT5_D0tIORAxWSpJUCHVdRIX0Q0bkNegQIHhAE&biw=1536&bih=695&dpr=1.25#lrd=0x94945b0232545259:0x24d8221acd6e1016,3,,,,"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deixar Avaliação no Google
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>
        {/* Education Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            {/* Cabeçalho */}
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                A contabilidade só faz sentido quando você entende <br />o que
                ela está dizendo.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Criamos conteúdos que traduzem o técnico pro prático — e o
                complicado pro simples.
              </p>
            </div>

            {/* Grid de Tipos de Conteúdo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
              <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-none bg-background/60 backdrop-blur">
                <a
                  href="https://www.youtube.com/@CyrinoContabilidade"
                  target="_blank"
                >
                  <CardContent className="p-6 text-center md:text-left">
                    <div className="text-4xl mb-4">🎥</div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Vídeos rápidos
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Explicações simples e visuais sobre temas que geram dúvida
                      no dia a dia.
                    </p>
                  </CardContent>
                </a>
              </Card>
              <a href="/conteudos" target="_blank">
                <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-none bg-background/60 backdrop-blur">
                  <CardContent className="p-6 text-center md:text-left">
                    <div className="text-4xl mb-4">📘</div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Conteúdos gratuitos
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Materiais densos e diretos para você baixar e aplicar no
                      seu negócio.
                    </p>
                  </CardContent>
                </Card>
              </a>
              <a
                href="https://www.instagram.com/cyrinocontabilidade/"
                target="_blank"
              >
                <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-none bg-background/60 backdrop-blur">
                  <CardContent className="p-6 text-center md:text-left">
                    <div className="text-4xl mb-4">📰</div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Artigos educativos
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Entenda seus impostos, direitos e oportunidades com
                      leitura rápida.
                    </p>
                  </CardContent>
                </Card>
              </a>
            </div>

            {/* Instagram Showcase */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide mb-4">
                  <Instagram size={14} />
                  Instagram
                </span>
                <h3 className="text-2xl font-bold text-foreground">
                  Acompanhe a Cyrino no Instagram e fique por dentro de dicas
                  para empresas e<br /> outras novidades
                </h3>
              </div>

              {/* Container da Imagem */}
              <a
                href="https://www.instagram.com/cyrinocontabilidade/"
                target="_blank"
                rel="noopener noreferrer"
                // MUDANÇA 1: Removi o 'md:aspect-[21/9]'. Agora é sempre 'aspect-video' (16:9), igual sua imagem.
                className="block group relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              >
                {/* Imagem de Fundo (Print) */}
                <img
                  src={artInstagram}
                  alt="Instagram da Cyrino Contabilidade"
                  // MUDANÇA 2: Adicionei 'object-top'. Se houver qualquer corte, o topo fica fixo e corta embaixo.
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Overlay Escuro (Sempre visível, mas leve) */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                {/* Gradiente Laranja (Aparece no Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-10 md:pb-16 translate-y-4 group-hover:translate-y-0">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 px-4">
                    <p className="text-lg md:text-xl font-medium mb-4 drop-shadow-md">
                      Dicas diárias, bastidores e novidades para sua empresa
                    </p>

                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-orange-600 hover:bg-white/90 font-bold gap-2 shadow-lg hover:shadow-orange-900/20"
                    >
                      <Instagram size={20} />
                      Seguir @cyrinocontabilidade
                    </Button>
                  </div>
                </div>
              </a>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="px-10 py-6 text-lg shadow-md"
                  asChild
                >
                  <Link to="/conteudos" className="flex items-center gap-2">
                    Ver mais conteúdos
                    <ArrowRight size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <YoutubeVideos />

        {/* Section - Clareza e Resultados */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Clareza também dá resultado.
            </h2>
            <p className="text-lg text-background/80 mb-12">
              Veja o que conquistamos junto com nossos clientes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <CounterCard
                end={800}
                suffix="+"
                text="empresas atendidas com clareza"
              />
              <CounterCard
                end={4}
                decimals={1}
                millions
                suffix=" milhões"
                text="em impostos economizados com segurança"
              />
              <CounterCard
                end={350}
                millions
                suffix=" milhões"
                text="de faturamento gerenciado com transparência"
              />
            </div>
            <p className="mt-12 text-background/80 max-w-2xl mx-auto leading-relaxed">
              Cada número aqui representa uma história de crescimento, confiança
              e tranquilidade contábil.
            </p>
          </div>
        </section>

        {/* National Coverage Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              A Cyrino está presente em todo o Brasil.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Atendemos empresas de todos os tamanhos e regiões, com o mesmo
              cuidado, proximidade e clareza.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg font-semibold text-primary">
              <span className="px-6 py-3 bg-primary/10 rounded-full">
                São Paulo
              </span>
              <span className="px-6 py-3 bg-primary/10 rounded-full">
                Brasília
              </span>
              <span className="px-6 py-3 bg-primary/10 rounded-full">
                Belo Horizonte
              </span>
              <span className="px-6 py-3 bg-primary/10 rounded-full">
                Campo Grande
              </span>
              <span className="px-6 py-3 bg-primary/10 rounded-full">
                E todo o Brasil
              </span>
            </div>
          </div>
        </section>

        {/* Final Call Section */}
        <section className="py-24 bg-gradient-to-br from-primary to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Entender seus números é o primeiro passo pra crescer com
              segurança.
            </h2>
            <p className="text-lg opacity-95 mb-10">
              Fale com a Cyrino Contabilidade e descubra como a clareza
              transforma a forma como você administra e prospera.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-sm lg:text-lg shadow-xl hover:shadow-2xl transition-all"
              asChild
            >
              <a
                href="https://wa.me/551832657176"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors text-center whitespace-normal"
              >
                <FaWhatsapp className="!w-6 !h-6 flex-shrink-0" />
                <span className="block">
                  Quero clareza na minha contabilidade
                </span>
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
