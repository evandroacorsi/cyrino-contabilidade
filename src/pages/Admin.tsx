import { ClientToolsManager } from "@/components/admin/ClientToolsManager";
import { ImageLibraryManager } from "@/components/admin/ImageLibraryManager";
import { NewsDialog } from "@/components/admin/NewsDialog";
import { NewsList } from "@/components/admin/NewsList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { NewsPost } from "@/lib/news";
import type { User } from "@supabase/supabase-js";
import { FileText, Image as ImageIcon, LogOut, Plus, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Estados para Notícias
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const validateAdmin = async (sessionUser: User | null) => {
      if (!sessionUser) {
        setUser(null);
        setIsAdmin(false);
        navigate("/auth");
        return;
      }

      setUser(sessionUser);
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: sessionUser.id,
        _role: "admin",
      });

      if (error || data !== true) {
        setIsAdmin(false);
        toast({
          title: "Acesso negado",
          description: "Sua conta não possui permissão de administrador.",
          variant: "destructive",
        });
        return;
      }

      setIsAdmin(true);
    };

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      await validateAdmin(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      validateAdmin(session?.user ?? null).finally(() => setLoading(false));
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logout realizado", description: "Você saiu com sucesso." });
    navigate("/auth");
  };

  // Funções de Notícias
  const handleEditNews = (news: NewsPost) => {
    setEditingNews(news);
    setIsNewsDialogOpen(true);
  };
  const handleCloseNewsDialog = () => {
    setIsNewsDialogOpen(false);
    setEditingNews(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Cyrino Contabilidade" className="h-16" />
            <div>
              <h1 className="text-xl font-bold text-muted">
                Painel Administrativo
              </h1>
              <p className="text-sm text-muted">
                {user?.email ?? "Cyrino Contabilidade"}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Componente de Abas para separar os conteúdos */}
        <Tabs defaultValue="news" className="w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <TabsList className="bg-white">
              <TabsTrigger value="news" className="gap-2">
                <FileText className="h-4 w-4" /> Notícias
              </TabsTrigger>
              <TabsTrigger value="client-tools" className="gap-2">
                <Wrench className="h-4 w-4" /> Portal do Cliente
              </TabsTrigger>
              <TabsTrigger value="image-library" className="gap-2">
                <ImageIcon className="h-4 w-4" /> Biblioteca de Imagens
              </TabsTrigger>
            </TabsList>
          </div>

          {/* CONTEÚDO DA ABA DE NOTÍCIAS */}
          <TabsContent value="news">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Gerenciar Notícias
                </h2>
                <p className="text-muted-foreground mt-1">
                  Crie, edite e gerencie as notícias do site
                </p>
              </div>
              {isAdmin && (
                <Button
                  onClick={() => setIsNewsDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" /> Nova Notícia
                </Button>
              )}
            </div>

            {isAdmin ? (
              <NewsList onEdit={handleEditNews} key={`news-${refreshKey}`} />
            ) : (
              <div className="rounded-lg border border-destructive/30 bg-white p-8 text-center text-muted-foreground">
                Esta conta está autenticada, mas não possui permissão de administrador.
              </div>
            )}
          </TabsContent>

          <TabsContent value="client-tools">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground">
                Ferramentas do Portal do Cliente
              </h2>
              <p className="text-muted-foreground mt-1">
                Gerencie os cards de acesso exibidos na página Área do Cliente.
              </p>
            </div>

            {isAdmin ? (
              <ClientToolsManager />
            ) : (
              <div className="rounded-lg border border-destructive/30 bg-white p-8 text-center text-muted-foreground">
                Esta conta está autenticada, mas não possui permissão de administrador.
              </div>
            )}
          </TabsContent>

          <TabsContent value="image-library">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground">
                Biblioteca de Imagens
              </h2>
              <p className="text-muted-foreground mt-1">
                Visualize e exclua as imagens salvas na pasta de uploads do servidor.
              </p>
            </div>

            {isAdmin ? (
              <ImageLibraryManager />
            ) : (
              <div className="rounded-lg border border-destructive/30 bg-white p-8 text-center text-muted-foreground">
                Esta conta está autenticada, mas não possui permissão de administrador.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <NewsDialog
        open={isNewsDialogOpen}
        onOpenChange={handleCloseNewsDialog}
        editingNews={editingNews}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />
    </div>
  );
}
