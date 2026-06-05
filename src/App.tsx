import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom"; // ADICIONE useLocation AQUI
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import AbrirEmpresa from "./pages/AbrirEmpresa";
import Admin from "./pages/Admin";
import Agradecimento from "./pages/Agradecimento";
import AreaCliente from "./pages/AreaCliente";
import Arquivos from "./pages/Arquivos";
import Auth from "./pages/Auth";
import BlogPost from "./pages/BlogPost";
import Contato from "./pages/Contato";
import Conteudos from "./pages/Conteudos";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import Noticias from "./pages/Noticias";
import RedirectToWhatsApp from "./pages/RedirectToWhatsapp";
import Sobre from "./pages/Sobre";
import Solucoes from "./pages/Solucoes";

const queryClient = new QueryClient();

const RedirectLegacyNewsCategory = () => {
  const { categorySlug } = useParams();
  return <Navigate to={categorySlug ? `/conteudos/categoria/${categorySlug}` : "/conteudos"} replace />;
};

const RedirectLegacyNewsPost = () => {
  const { id } = useParams();
  return <Navigate to={id ? `/conteudos/${id}` : "/conteudos"} replace />;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const hiddenRoutes = ["/auth", "/admin", "/arquivos"];

  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {/* Só mostra Navbar se NÃO for a página de arquivos */}
      {!hideLayout && <Navbar />}

      {children}

      {/* Só mostra Footer e WhatsApp se NÃO for a página de arquivos */}
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        {/* Envolvemos as Rotas com o nosso Layout condicional */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/abrir-empresa" element={<AbrirEmpresa />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/conteudos" element={<Noticias />} />
            <Route
              path="/conteudos/categoria/:categorySlug"
              element={<Noticias />}
            />
            <Route path="/conteudos/:id" element={<NoticiaDetalhe />} />
            <Route path="/noticias" element={<Navigate to="/conteudos" replace />} />
            <Route path="/noticias/categoria/:categorySlug" element={<RedirectLegacyNewsCategory />} />
            <Route path="/noticia/:id" element={<RedirectLegacyNewsPost />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/area-cliente" element={<AreaCliente />} />
            <Route path="/arquivos" element={<Arquivos />} />
            <Route path="/agradecimento" element={<Agradecimento />} />

            <Route path="/zap" element={<RedirectToWhatsApp />} />

            {/* Páginas sem Header/Footer */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
