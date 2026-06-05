import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { fetchJson } from "@/lib/api";
import { ClientTool, ClientToolInput, emptyClientTool, sortClientTools } from "@/lib/clientTools";
import { Edit, ExternalLink, FolderOpen, Plus, Save, Trash2, Upload, X } from "lucide-react";
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

const getSessionToken = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Sessão inválida");
  return session.access_token;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Ocorreu um erro inesperado.";

const createInitialForm = (nextOrder: number): ClientToolInput => ({
  ...emptyClientTool,
  order: nextOrder,
});

export function ClientToolsManager() {
  const [tools, setTools] = useState<ClientTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClientToolInput>(createInitialForm(1));
  const logoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const orderedTools = useMemo(() => sortClientTools(tools), [tools]);
  const nextOrder = useMemo(
    () => Math.max(0, ...tools.map((tool) => Number(tool.order) || 0)) + 1,
    [tools],
  );

  const fetchTools = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchJson<{ tools: ClientTool[] }>("/api/client-tools.php");
      setTools(Array.isArray(data.tools) ? data.tools : []);
    } catch (error: unknown) {
      toast({
        title: "Erro ao carregar ferramentas",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  useEffect(() => {
    if (!editingId) setFormData(createInitialForm(nextOrder));
  }, [editingId, nextOrder]);

  const resetForm = () => {
    setEditingId(null);
    setFormData(createInitialForm(nextOrder));
  };

  const handleEdit = (tool: ClientTool) => {
    setEditingId(tool.id);
    setFormData({ ...tool });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);
      const token = await getSessionToken();
      const payload = {
        ...formData,
        order: Number(formData.order) || nextOrder,
      };

      await fetchJson<{ success: boolean }>("/api/client-tools.php", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      toast({ title: editingId ? "Ferramenta atualizada" : "Ferramenta criada" });
      resetForm();
      await fetchTools();
    } catch (error: unknown) {
      toast({
        title: "Erro ao salvar",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (tool: ClientTool) => {
    if (!window.confirm(`Excluir "${tool.title}" do Portal do Cliente?`)) return;

    try {
      const token = await getSessionToken();
      await fetchJson<{ success: boolean }>(`/api/client-tools.php?id=${encodeURIComponent(tool.id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({ title: "Ferramenta excluída" });
      setTools((prev) => prev.filter((item) => item.id !== tool.id));
      if (editingId === tool.id) resetForm();
    } catch (error: unknown) {
      toast({
        title: "Erro ao excluir",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      const token = await getSessionToken();
      const data = new FormData();
      data.append("image", file);

      const result = await fetchJson<{ media: { url: string } }>("/api/media.php", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      setFormData((prev) => ({ ...prev, image: result.media.url }));
      toast({ title: "Logo enviada" });
    } catch (error: unknown) {
      toast({
        title: "Erro ao enviar logo",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <div className="space-y-4">
        {loading ? (
          <div className="rounded-lg border bg-white p-8 text-center text-muted-foreground">
            Carregando ferramentas...
          </div>
        ) : orderedTools.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-white p-8 text-center text-muted-foreground">
            Nenhuma ferramenta cadastrada.
          </div>
        ) : (
          orderedTools.map((tool) => (
            <Card key={tool.id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted p-2">
                    {tool.image ? (
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <FolderOpen className="h-7 w-7 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{tool.category || "Sem categoria"}</Badge>
                      <Badge variant={tool.active ? "default" : "outline"}>
                        {tool.active ? "Ativo" : "Oculto"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Ordem {tool.order}</span>
                    </div>
                    <h3 className="truncate font-semibold">{tool.title}</h3>
                    <a
                      href={tool.url}
                      target={tool.external ? "_blank" : undefined}
                      rel={tool.external ? "noopener noreferrer" : undefined}
                      className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      <span className="truncate">{tool.url}</span>
                    </a>
                  </div>

                  <div className="flex gap-2 sm:self-start">
                    <Button type="button" variant="outline" size="icon" onClick={() => handleEdit(tool)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="destructive" size="icon" onClick={() => handleDelete(tool)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="h-fit bg-white">
        <CardContent className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {editingId ? "Editar ferramenta" : "Nova ferramenta"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Defina logo, nome, categoria e link do Portal do Cliente.
              </p>
            </div>
            {editingId && (
              <Button type="button" variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tool-title">Nome</Label>
                <Input
                  id="tool-title"
                  value={formData.title}
                  onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tool-category">Categoria</Label>
                <Input
                  id="tool-category"
                  value={formData.category}
                  onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tool-url">URL</Label>
              <Input
                id="tool-url"
                value={formData.url}
                onChange={(event) => setFormData((prev) => ({ ...prev, url: event.target.value }))}
                placeholder="https://..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tool-image">Logo</Label>
              <div className="flex gap-2">
                <Input
                  id="tool-image"
                  value={formData.image}
                  onChange={(event) => setFormData((prev) => ({ ...prev, image: event.target.value }))}
                  placeholder="/uploads/logo.png ou https://..."
                />
                <input
                  ref={logoInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleLogoUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 gap-2"
                  disabled={uploadingLogo}
                  onClick={() => logoInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {uploadingLogo ? "Enviando" : "Enviar"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use upload ou cole uma URL pública. Se deixar vazio, será usado um ícone padrão.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="tool-order">Ordem</Label>
                <Input
                  id="tool-order"
                  type="number"
                  min={1}
                  value={formData.order}
                  onChange={(event) => setFormData((prev) => ({ ...prev, order: Number(event.target.value) }))}
                />
              </div>

              <label className="flex items-center gap-2 pt-7 text-sm">
                <Checkbox
                  checked={formData.external}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, external: checked === true }))}
                />
                Link externo
              </label>

              <label className="flex items-center gap-2 pt-7 text-sm">
                <Checkbox
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, active: checked === true }))}
                />
                Ativo
              </label>
            </div>

            <Button type="submit" disabled={saving} className="w-full gap-2">
              {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Criar ferramenta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
