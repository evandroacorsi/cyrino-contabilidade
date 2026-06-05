import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchPublicNews, filterNews, findCategoryBySlug, getNewsCategories, NewsSummary, slugifyCategory } from "@/lib/news";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, FileText, ImageOff, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PAGE_SIZE = 6;

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getPageWindow = (currentPage: number, totalPages: number) => {
  const windowSize = 5;
  const halfWindow = Math.floor(windowSize / 2);
  const start = Math.max(1, Math.min(currentPage - halfWindow, totalPages - windowSize + 1));
  const end = Math.min(totalPages, start + windowSize - 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Noticias = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState<NewsSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPublicNews()
      .then(setNoticias)
      .finally(() => setLoading(false));
  }, []);

  const categorias = useMemo(() => getNewsCategories(noticias), [noticias]);
  const routeCategory = useMemo(
    () => findCategoryBySlug(categorias, categorySlug),
    [categorias, categorySlug],
  );
  const activeCategory = routeCategory || categoriaFiltro;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  const noticiasFiltradas = useMemo(
    () => filterNews(noticias, searchTerm, activeCategory),
    [noticias, searchTerm, activeCategory],
  );

  const featuredNews = noticiasFiltradas[0];
  const remainingNews = noticiasFiltradas.slice(1);
  const totalPages = Math.max(1, Math.ceil(remainingNews.length / PAGE_SIZE));
  const paginatedNews = remainingNews.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pageWindow = getPageWindow(currentPage, totalPages);

  const hasFilters = Boolean(searchTerm || activeCategory);

  const resetFilters = () => {
    setSearchTerm("");
    setCategoriaFiltro("");
    navigate("/conteudos");
  };

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setCategoriaFiltro("");
      navigate("/conteudos");
      return;
    }

    setCategoriaFiltro(value);
    navigate(`/conteudos/categoria/${slugifyCategory(value)}`);
  };

  const changePage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    goToTop();
  };

  return (
    <>
      <SEO
        title={activeCategory ? `${activeCategory} | Notícias Cyrino Contabilidade` : "Notícias Contábeis | Cyrino Contabilidade"}
        description={
          activeCategory
            ? `Acompanhe notícias e orientações sobre ${activeCategory} da Cyrino Contabilidade.`
            : "Acompanhe notícias, novidades e orientações contábeis da Cyrino Contabilidade."
        }
        url={
          activeCategory
            ? `https://www.cyrinocontabilidade.com.br/conteudos/categoria/${slugifyCategory(activeCategory)}`
            : "https://www.cyrinocontabilidade.com.br/conteudos"
        }
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />

      <div className="min-h-screen pt-20">
        <section className="bg-gradient-to-br from-primary via-orange-500 to-secondary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
                Notícias
              </h1>
              <p className="text-lg md:text-xl opacity-95 leading-relaxed">
                Acompanhe novidades, orientações e atualizações importantes para empresas e empreendedores.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por título..."
                  className="border rounded-lg pl-10 pr-4 py-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm h-[50px]"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <Select
                value={activeCategory || "all"}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full md:w-[260px] h-[50px] bg-white border rounded-lg px-4 shadow-sm focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Todas categorias" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={5}
                  className="max-h-[300px] w-[var(--radix-select-trigger-width)] bg-white shadow-md overflow-y-auto"
                >
                  <SelectItem value="all">Todas categorias</SelectItem>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {loading ? (
          <section className="py-20 bg-background">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary" />
            </div>
          </section>
        ) : noticiasFiltradas.length === 0 ? (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-64 text-center text-muted-foreground bg-gray-50 rounded-xl p-8 border border-dashed">
                <p className="text-lg mb-4 font-medium">Nenhuma notícia encontrada.</p>
                {hasFilters ? (
                  <>
                    <p>Tente limpar os filtros ou buscar por outro termo.</p>
                    <Button onClick={resetFilters} variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Limpar filtros
                    </Button>
                  </>
                ) : (
                  <p>Volte mais tarde para conferir novas notícias.</p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <>
            {featuredNews && (
              <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                  <Card className="max-w-5xl mx-auto overflow-hidden border-2 border-primary shadow-2xl hover:shadow-glow transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                      <div className="md:col-span-2 min-h-[260px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        {featuredNews.imagem[0] ? (
                          <img
                            src={featuredNews.imagem[0]}
                            alt={featuredNews.titulo}
                            fetchPriority="high"
                            decoding="async"
                            className="w-full h-full min-h-[260px] object-cover"
                          />
                        ) : (
                          <FileText className="h-32 w-32 text-white opacity-90" />
                        )}
                      </div>
                      <CardContent className="md:col-span-3 p-8 flex flex-col justify-center">
                        <div className="mb-4 flex flex-wrap gap-2">
                          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                            Destaque
                          </span>
                          {featuredNews.categoria.map((cat) => (
                            <Badge key={cat} variant="secondary" asChild>
                              <Link to={`/conteudos/categoria/${slugifyCategory(cat)}`}>{cat}</Link>
                            </Badge>
                          ))}
                        </div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 text-foreground">
                          {featuredNews.titulo}
                        </h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {featuredNews.descricao}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} className="text-primary" />
                            {formatDate(featuredNews.data)}
                          </span>
                        </div>
                        <Button className="w-fit group" asChild>
                          <Link to={`/conteudos/${featuredNews.slug}`}>
                            Ler Notícia Completa
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </section>
            )}

            <section className="py-12 pb-20 bg-background">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  {paginatedNews.length === 0 ? (
                    <div className="text-center text-muted-foreground py-10">
                      Nenhuma outra notícia para exibir.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedNews.map((noticia, index) => (
                        <Card
                          key={noticia.id}
                          className="group hover:shadow-xl transition-all duration-300 border hover:border-primary overflow-hidden animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                          <CardContent className="p-6 flex flex-col h-full">
                            {noticia.imagem[0] ? (
                              <div className="mb-4 h-40 rounded-lg overflow-hidden bg-muted">
                                <img
                                  src={noticia.imagem[0]}
                                  alt={noticia.titulo}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="mb-4 h-40 rounded-lg bg-muted text-muted-foreground flex flex-col items-center justify-center">
                                <ImageOff className="h-8 w-8 mb-2" />
                                <span className="text-xs">Sem imagem</span>
                              </div>
                            )}

                            <div className="mb-3 flex flex-wrap gap-2">
                              {noticia.categoria.map((cat) => (
                                <Link key={cat} to={`/conteudos/categoria/${slugifyCategory(cat)}`} className="inline-block px-2 py-1 bg-muted text-xs font-medium rounded hover:bg-primary hover:text-primary-foreground">
                                  {cat}
                                </Link>
                              ))}
                            </div>
                            <h3 className="font-heading text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {noticia.titulo}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                              {noticia.descricao}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground mb-4 pb-4 border-b">
                              <span className="flex items-center gap-1">
                                <Calendar size={14} className="text-primary" />
                                {formatDate(noticia.data)}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                              asChild
                            >
                              <Link to={`/conteudos/${noticia.slug}`}>
                                Ler Mais
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {totalPages > 1 && (
                    <Pagination className="mt-12">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            size="default"
                            onClick={(event) => {
                              event.preventDefault();
                              changePage(currentPage - 1);
                            }}
                            className={`gap-1 pl-2.5 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Anterior
                          </PaginationLink>
                        </PaginationItem>

                        {pageWindow.map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={page === currentPage}
                              onClick={(event) => {
                                event.preventDefault();
                                changePage(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            size="default"
                            onClick={(event) => {
                              event.preventDefault();
                              changePage(currentPage + 1);
                            }}
                            className={`gap-1 pr-2.5 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                          >
                            Próxima
                            <ChevronRight className="h-4 w-4" />
                          </PaginationLink>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Noticias;
