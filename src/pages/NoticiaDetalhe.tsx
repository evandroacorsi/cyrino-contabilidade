import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPublicNewsPost, NewsPost } from "@/lib/news";
import SEO from "@/components/SEO";

const SITE_URL = "https://www.cyrinocontabilidade.com.br";

const absoluteUrl = (value?: string) => {
    if (!value) return `${SITE_URL}/og-image.png`;
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const contentToHtml = (content: string) => {
    if (!content) return "";
    if (/<[a-z][\s\S]*>/i.test(content)) return normalizeHtml(content);

    return content
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
        .join("");
};

const isEmptyBlock = (element: Element) => {
    const tag = element.tagName.toLowerCase();
    if (!["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) return false;
    if (element.querySelector("img, iframe, video, audio, table, ul, ol, blockquote")) return false;
    return !element.textContent?.trim();
};

const normalizeHtml = (content: string) => {
    if (typeof DOMParser === "undefined") return content;

    const parser = new DOMParser();
    const documentHtml = parser.parseFromString(`<div id="news-content-root">${content}</div>`, "text/html");
    const root = documentHtml.getElementById("news-content-root");
    if (!root) return content;

    root.querySelectorAll("script, style").forEach((element) => element.remove());

    root.querySelectorAll("*").forEach((element) => {
        Array.from(element.attributes).forEach((attribute) => {
            const name = attribute.name.toLowerCase();
            const value = attribute.value.trim().toLowerCase();

            if (name.startsWith("on")) element.removeAttribute(attribute.name);
            if ((name === "href" || name === "src") && value.startsWith("javascript:")) {
                element.removeAttribute(attribute.name);
            }
        });
    });

    root.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((heading) => {
        const figures = Array.from(heading.querySelectorAll("figure"));
        figures.reverse().forEach((figure) => heading.after(figure));
    });

    Array.from(root.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const paragraph = documentHtml.createElement("p");
            paragraph.textContent = node.textContent;
            node.replaceWith(paragraph);
            return;
        }

        if (node instanceof HTMLElement && node.tagName.toLowerCase() === "span") {
            const paragraph = documentHtml.createElement("p");
            paragraph.innerHTML = node.outerHTML;
            node.replaceWith(paragraph);
        }
    });

    root.querySelectorAll("p,div,h1,h2,h3,h4,h5,h6").forEach((element) => {
        if (isEmptyBlock(element)) element.remove();
    });

    return root.innerHTML;
};

const NoticiaDetalhes = () => {
    const { id } = useParams();
    const [noticia, setNoticia] = useState<NewsPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const conteudoCompleto = noticia?.conteudo ?? "";

    const [imagemAberta, setImagemAberta] = useState<string | null>(null);

    // Lógica do carrossel automático
    useEffect(() => {
        if (!noticia || !noticia.imagens || noticia.imagens.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % noticia.imagens.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [noticia]);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                if (!id) return;
                setNoticia(await fetchPublicNewsPost(id));
            } catch (error) {
                console.error("Erro ao buscar notícia:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticia();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    if (!noticia)
        return (
            <div className="text-center p-12">
                <h1 className="text-2xl font-bold">Notícia não encontrada</h1>
                <Link to="/conteudos">
                    <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                </Link>
            </div>
        );

    const noticiaUrl = `${SITE_URL}/conteudos/${noticia.slug || noticia.id}`;
    const noticiaImage = absoluteUrl(noticia.imagens?.[0] || noticia.imagem?.[0]);
    const publishedDate = noticia.data ? `${noticia.data}T00:00:00-03:00` : undefined;
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": noticia.titulo,
        "description": noticia.descricao,
        "image": [noticiaImage],
        "datePublished": publishedDate,
        "dateModified": publishedDate,
        "author": {
            "@type": "Organization",
            "name": "Cyrino Contabilidade",
            "url": SITE_URL,
        },
        "publisher": {
            "@type": "Organization",
            "name": "Cyrino Contabilidade",
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/logo.png`,
            },
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": noticiaUrl,
        },
    };

    return (
        <>
        <SEO
            title={`${noticia.titulo} | Cyrino Contabilidade`}
            description={noticia.descricao}
            url={noticiaUrl}
            image={noticiaImage}
            type="article"
            publishedTime={publishedDate}
            modifiedTime={publishedDate}
            jsonLd={articleJsonLd}
        />
        <div className="container mx-auto px-4 pt-8 pb-12 max-w-4xl">
            <Link to="/conteudos">
                <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary text-muted-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Notícias
                </Button>
            </Link>

            {/* Carrossel (Mantido igual) */}
            {noticia.imagens?.length > 0 && (
                <section className="relative mb-8 w-full h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden shadow-md group">
                    {noticia.imagens.map((img: string, idx: number) => (
                        <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                            <img
                                src={img}
                                alt={`${noticia.titulo} - imagem ${idx + 1}`}
                                loading={idx === 0 ? "eager" : "lazy"}
                                decoding="async"
                                className="w-full h-full object-cover cursor-zoom-in"
                                onClick={() => setImagemAberta(img)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                    ))}
                    {/* Controles do Carrossel (Simplificados para leitura, mas mantenha o seu código original se preferir) */}
                    {noticia.imagens.length > 1 && (
                        <>
                            <button onClick={() => setCurrentSlide(currentSlide === 0 ? noticia.imagens.length - 1 : currentSlide - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-20">
                                <ChevronLeft />
                            </button>
                            <button onClick={() => setCurrentSlide((currentSlide + 1) % noticia.imagens.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-20">
                                <ChevronRight />
                            </button>
                        </>
                    )}
                </section>
            )}

            <div className="mb-8">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {noticia.titulo}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {(() => {
                            if (!noticia.data) return "";
                            const [ano, mes, dia] = noticia.data.split("-");
                            return new Date(Number(ano), Number(mes) - 1, Number(dia)).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
                        })()}
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-none">
                <CardContent className="p-0">
                    {noticia.descricao && (
                        <div className="relative mb-10 p-6 bg-primary/20 rounded-2xl border border-slate-100 italic">
                            {/* Um detalhe visual discreto no topo para dar "personalidade" */}
                            <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                                Resumo
                            </div>
                            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                                {noticia.descricao}
                            </p>
                        </div>
                    )}

                    <div
                        className="prose prose-lg prose-gray max-w-none leading-relaxed text-gray-800 break-words [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:bg-gray-50 [&_blockquote]:rounded-r-lg"
                        dangerouslySetInnerHTML={{ __html: contentToHtml(conteudoCompleto) }}
                    />
                </CardContent>
            </Card>

            {/* Rodapé */}
            <div className="text-center mt-16 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Gostou desta notícia?
                </h3>
                <p className="text-muted-foreground mb-8">
                    Acompanhe todas as novidades e orientações da Cyrino Contabilidade.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                    <Link to="/conteudos" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            Ver Mais Notícias
                        </Button>
                    </Link>
                    <Link to="/contato" className="w-full sm:w-auto">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Entre em Contato
                        </Button>
                    </Link>
                </div>
            </div>
            {imagemAberta && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setImagemAberta(null)}
                >
                    {/* Botão fechar */}
                    <button
                        onClick={() => setImagemAberta(null)}
                        className="absolute top-4 right-4 text-white text-3xl font-bold hover:opacity-80"
                    >
                        ✕
                    </button>

                    {/* Imagem */}
                    <img
                        src={imagemAberta}
                        alt="Imagem ampliada"
                        decoding="async"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar na imagem
                    />
                </div>
            )}
        </div>
        </>
    );
};

export default NoticiaDetalhes;
