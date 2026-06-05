import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import whatsapp from "@/assets/WhatsApp.png";
import SEO from "@/components/SEO";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limite de caracteres da mensagem
    if (name === "message" && value.length > 300) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Limite de caracteres (já garantido no textarea)
    const messageLimited = formData.message.slice(0, 300);

    // Texto sem emojis problemáticos
    const text =
      `*Solicitação de contato*:\n\n` +
      `Nome: ${formData.name}\n` +
      `E-mail: ${formData.email}\n` +
      `Assunto: ${formData.subject}\n\n` +
      `${messageLimited}`;

    const encoded = encodeURIComponent(text);

    // Número oficial da empresa
    const whatsappNumber = "551832657176";

    // Redirecionar para o WhatsApp com a mensagem preenchida
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content:
        "Rua Expedicionário Brasileiro, 350, Sala 6\nCentro, Rancharia - SP\nCEP 19600-007",
      link: "https://maps.google.com/?q=Rua+Expedicionário+Brasileiro+350+Rancharia+SP",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: `(18) 3265-7176 ${"\n"} Whatsapp Oficial`,
      link: "tel:+551832657176",
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      content:
        "Segunda-Feira a Sexta-Feira\nManhã: 8h às 11h\nTarde: 13h às 17h",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Contato | Cyrino Contabilidade"
        description="Entre em contato com a Cyrino Contabilidade. Atendimento contábil especializado para empresas e MEI. Fale via WhatsApp ou formulário."
        url="https://www.cyrinocontabilidade.com.br/contato"
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Entre em Contato
            </h1>
            <p className="text-lg md:text-xl opacity-95 leading-relaxed">
              Estamos prontos para ajudar seu negócio a crescer. Fale conosco!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border hover:border-primary animate-fade-in h-full"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <info.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold mb-3 text-foreground">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={
                        info.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        info.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-pre-wrap break-words leading-relaxed"
                      style={{ wordBreak: "break-word" }}
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {info.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="py-12 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            {/* Contact Form */}
            <Card className="border-2 h-full">
              <CardContent className="p-8">
                <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                  Envie uma Mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Como podemos ajudar?"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Conte-nos mais sobre sua necessidade..."
                      rows={5}
                      className="mt-2"
                    />
                    <div className="text-right text-sm text-muted-foreground">
                      {formData.message.length}/300
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and WhatsApp side */}
            <div className="flex flex-col justify-between h-full gap-6">
              {/* Google Maps */}
              <Card className="overflow-hidden border-2 flex-1">
                <CardContent className="p-0 h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.8!2d-50.8934!3d-22.2264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDEzJzM1LjAiUyA1MMKwNTMnMzYuMiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Cyrino Contabilidade"
                  />
                </CardContent>
              </Card>

              {/* WhatsApp Card */}
              <Card className="border-2 border-[#25D366] bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 flex-1 flex items-center">
                <CardContent className="p-8 text-center w-full">
                  <img
                    src={whatsapp}
                    className="h-16 w-16 text-[#25D366] mx-auto mb-4"
                  />
                  <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                    Prefere WhatsApp?
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Fale diretamente com nossa equipe através do WhatsApp.
                    Resposta rápida e atendimento personalizado!
                  </p>
                  <Button
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold"
                    asChild
                  >
                    <a
                      href="https://wa.me/551832657176"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="!w-6 !h-6 mr-2" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-12 bg-secondary text-secondary-foreground border-b-4 border-primary">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white">
            <CardContent className="p-8">
              <h3 className="font-heading text-2xl font-bold mb-6 text-center text-foreground">
                Informações da Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Razão Social:
                  </p>
                  <p className="text-muted-foreground">Cyrino Contabilidade</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">CNPJ:</p>
                  <p className="text-muted-foreground">26.700.412/0001-28</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Responsável Técnico:
                  </p>
                  <p className="text-muted-foreground">
                    Rodrigo Cyrino Ribeiro
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">CRC:</p>
                  <p className="text-muted-foreground">
                    1SP 289664 | 2SP 038081
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contato;
