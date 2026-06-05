import react from "@vitejs/plugin-react-swc";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "path";
import { Readable } from "node:stream";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv, Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "public");
const newsDir = path.join(publicDir, "news");
const uploadsDir = path.join(publicDir, "uploads");
const clientToolsDir = path.join(publicDir, "client-tools");
const newsIndexPath = path.join(newsDir, "index.json");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const clientToolsIndexPath = path.join(clientToolsDir, "index.json");
const siteUrl = "https://www.cyrinocontabilidade.com.br";

type NewsPayload = {
  id?: string;
  slug?: string;
  data?: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  categoria?: string[];
  imagem?: string[];
  visualizacoes?: number;
};

type MediaItem = {
  name: string;
  url: string;
  size: number;
  modifiedAt: string;
};

type MediaPagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

type ClientToolPayload = {
  id?: string;
  category?: string;
  title: string;
  image?: string;
  url: string;
  external?: boolean;
  order?: number;
  active?: boolean;
};

const ensureDir = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true });
};

const respondJson = (res: ServerResponse, status: number, data: unknown) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
};

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const escapeFrontmatter = (value: string) => value.replace(/\r/g, "").replace(/\n/g, " ").trim();

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const sitemapUrl = (route: string) => `${siteUrl.replace(/\/$/, "")}/${route.replace(/^\//, "")}`;

const parseValue = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const looksJson =
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    (trimmed.startsWith("{") && trimmed.endsWith("}"));
  if (looksJson) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/^["']|["']$/g, "");
};

const parseMarkdown = (markdown: string) => {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const frontmatter = match?.[1] ?? "";
  const content = match?.[2] ?? markdown;
  const meta: Record<string, unknown> = {};

  frontmatter.split("\n").forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    if (key) meta[key] = parseValue(value);
  });

  const normalizeArray = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.filter(Boolean).map(String);
    if (typeof value === "string" && value.trim()) {
      return value.split(",").map((item) => item.trim()).filter(Boolean);
    }
    return [];
  };

  const imagem = normalizeArray(meta.imagem ?? meta.imagens);

  return {
    id: String(meta.id ?? meta.slug ?? ""),
    slug: String(meta.slug ?? meta.id ?? ""),
    data: String(meta.data ?? ""),
    titulo: String(meta.titulo ?? ""),
    descricao: String(meta.descricao ?? ""),
    conteudo: content.trim(),
    categoria: normalizeArray(meta.categoria),
    imagem,
    imagens: imagem,
    visualizacoes: Number(meta.visualizacoes ?? 0),
  };
};

const toMarkdown = (post: Required<NewsPayload>) => `---
id: ${post.id}
slug: ${post.slug}
data: ${post.data}
titulo: "${escapeFrontmatter(post.titulo)}"
descricao: "${escapeFrontmatter(post.descricao)}"
categoria: ${JSON.stringify(post.categoria)}
imagem: ${JSON.stringify(post.imagem)}
visualizacoes: ${post.visualizacoes}
---
${post.conteudo.trim()}
`;

const getAccessToken = (headers: Headers | Record<string, string | string[] | undefined>) => {
  const rawHeader =
    headers instanceof Headers
      ? headers.get("authorization") || headers.get("Authorization") || ""
      : (headers.authorization as string | undefined) ||
        (headers.Authorization as string | undefined) ||
        "";

  if (!rawHeader.startsWith("Bearer ")) return null;
  return rawHeader.slice(7);
};

const validateSession = async (token: string | null, env: Record<string, string>) => {
  if (!token) throw new Error("Sessão ausente.");
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Supabase não configurado.");
  }

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) throw new Error("Sessão inválida.");

  const { data: hasRole, error: roleError } = await supabase.rpc("has_role", {
    _user_id: data.user.id,
    _role: "admin",
  });

  if (roleError || hasRole !== true) {
    throw new Error("Acesso negado. Apenas administradores podem gerenciar o conteúdo.");
  }
};

const buildNewsIndex = async () => {
  await ensureDir(newsDir);
  const files = (await fs.readdir(newsDir)).filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const markdown = await fs.readFile(path.join(newsDir, file), "utf-8");
      const post = parseMarkdown(markdown);
      const { conteudo, ...summary } = post;
      return {
        ...summary,
        path: `/news/${file}`,
      };
    }),
  );

  posts.sort((a, b) => String(b.data).localeCompare(String(a.data)));
  await fs.writeFile(newsIndexPath, JSON.stringify(posts, null, 2), "utf-8");
  await buildSitemap(posts);
  return posts;
};

const buildSitemap = async (posts: Array<{ slug?: string; id?: string; data?: string; categoria?: string[] }>) => {
  const today = new Date().toISOString().split("T")[0];
  const categoryRoutes = Array.from(
    new Set(
      posts
        .flatMap((post) => Array.isArray(post.categoria) ? post.categoria : [])
        .map((category) => slugify(category))
        .filter(Boolean),
    ),
  ).map((categorySlug) => ({
    loc: sitemapUrl(`/conteudos/categoria/${encodeURIComponent(categorySlug)}`),
    lastmod: today,
    priority: "0.7",
  }));

  const routes = [
    { loc: sitemapUrl("/"), lastmod: today, priority: "1.0" },
    { loc: sitemapUrl("/abrir-empresa"), lastmod: today, priority: "0.8" },
    { loc: sitemapUrl("/solucoes"), lastmod: today, priority: "0.8" },
    { loc: sitemapUrl("/conteudos"), lastmod: today, priority: "0.9" },
    { loc: sitemapUrl("/sobre"), lastmod: today, priority: "0.6" },
    { loc: sitemapUrl("/contato"), lastmod: today, priority: "0.7" },
    { loc: sitemapUrl("/area-cliente"), lastmod: today, priority: "0.5" },
    ...posts
      .map((post) => {
        const slug = post.slug || post.id;
        if (!slug) return null;

        return {
          loc: sitemapUrl(`/conteudos/${encodeURIComponent(slug)}`),
          lastmod: post.data || today,
          priority: "0.8",
        };
      })
      .filter(Boolean),
    ...categoryRoutes,
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.flatMap((route) => {
      if (!route) return [];

      return [
        "  <url>",
        `    <loc>${escapeXml(route.loc)}</loc>`,
        `    <lastmod>${escapeXml(route.lastmod)}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        `    <priority>${escapeXml(route.priority)}</priority>`,
        "  </url>",
      ];
    }),
    "</urlset>",
    "",
  ].join("\n");

  await fs.writeFile(sitemapPath, xml, "utf-8");
};

const findNewsFile = async (idOrSlug: string) => {
  await ensureDir(newsDir);
  const files = (await fs.readdir(newsDir)).filter((file) => file.endsWith(".md"));

  for (const file of files) {
    const post = parseMarkdown(await fs.readFile(path.join(newsDir, file), "utf-8"));
    if (post.id === idOrSlug || post.slug === idOrSlug) return path.join(newsDir, file);
  }

  return null;
};

const listMedia = async (page = 1, perPage = 12): Promise<{ items: MediaItem[]; pagination: MediaPagination }> => {
  await ensureDir(uploadsDir);
  const files = (await fs.readdir(uploadsDir)).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

  const stats = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(uploadsDir, file);
      const stat = await fs.stat(fullPath);
      return {
        name: file,
        url: `/uploads/${file}`,
        size: stat.size,
        modifiedAt: stat.mtime.toISOString(),
        mtime: stat.mtimeMs,
      };
    }),
  );

  const sorted = stats
    .sort((a, b) => b.mtime - a.mtime)
    .map(({ mtime: _mtime, ...media }) => media);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  return {
    items: sorted.slice((safePage - 1) * perPage, safePage * perPage),
    pagination: {
      page: safePage,
      perPage,
      total,
      totalPages,
    },
  };
};

const deleteMedia = async (nameOrUrl: string) => {
  await ensureDir(uploadsDir);
  const parsedName = nameOrUrl.startsWith("/uploads/")
    ? path.basename(nameOrUrl)
    : path.basename(new URL(nameOrUrl, "http://localhost").pathname);

  if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(parsedName)) {
    throw new Error("Imagem inválida.");
  }

  const targetPath = path.resolve(uploadsDir, parsedName);
  const uploadsRoot = path.resolve(uploadsDir);
  if (!targetPath.startsWith(`${uploadsRoot}${path.sep}`)) {
    throw new Error("Imagem inválida.");
  }

  await fs.unlink(targetPath);
};

const readClientTools = async () => {
  await ensureDir(clientToolsDir);

  try {
    const raw = await fs.readFile(clientToolsIndexPath, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data)
      ? data.sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))
      : [];
  } catch {
    return [];
  }
};

const writeClientTools = async (tools: ClientToolPayload[]) => {
  await ensureDir(clientToolsDir);
  const ordered = [...tools].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
  await fs.writeFile(clientToolsIndexPath, JSON.stringify(ordered, null, 2), "utf-8");
};

const normalizeClientTool = (body: Partial<ClientToolPayload>, existing?: Partial<ClientToolPayload>): ClientToolPayload => {
  const title = String(body.title ?? existing?.title ?? "").trim();
  const url = String(body.url ?? existing?.url ?? "").trim();
  const id = slugify(String(body.id ?? existing?.id ?? title));

  if (!title || !url || !id) {
    throw new Error("Nome e URL são obrigatórios.");
  }

  return {
    id,
    category: String(body.category ?? existing?.category ?? "").trim(),
    title,
    image: String(body.image ?? existing?.image ?? "").trim(),
    url,
    external: Boolean(body.external ?? existing?.external ?? true),
    order: Number(body.order ?? existing?.order ?? 1),
    active: Boolean(body.active ?? existing?.active ?? true),
  };
};

const requestToWebRequest = async (req: IncomingMessage) => {
  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : Readable.toWeb(req);

  const init: RequestInit & { duplex?: "half" } = {
    method: req.method,
    headers: req.headers as HeadersInit,
    body,
  };

  if (body) init.duplex = "half";

  return new Request(`http://localhost${req.url}`, {
    ...init,
  });
};

const devNewsApi = (env: Record<string, string>): Plugin => ({
  name: "dev-news-api",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (
        !req.url?.startsWith("/api/news.php") &&
        !req.url?.startsWith("/api/media.php") &&
        !req.url?.startsWith("/api/client-tools.php")
      ) {
        return next();
      }

      try {
        await ensureDir(newsDir);
        await ensureDir(uploadsDir);
        await ensureDir(clientToolsDir);

        const request = await requestToWebRequest(req);
        const url = new URL(request.url);

        if (url.pathname === "/api/news.php") {
          if (request.method === "GET") {
            const id = url.searchParams.get("id");
            if (id) {
              const file = await findNewsFile(id);
              if (!file) return respondJson(res, 404, { error: "Notícia não encontrada." });
              return respondJson(res, 200, parseMarkdown(await fs.readFile(file, "utf-8")));
            }

            return respondJson(res, 200, { noticias: await buildNewsIndex() });
          }

          const token = getAccessToken(request.headers);
          await validateSession(token, env);

          if (request.method === "POST" || request.method === "PUT") {
            const body = (await request.json()) as NewsPayload;
            const baseSlug = slugify(body.slug || body.titulo);

            if (!body.titulo || !body.descricao || !body.conteudo || !baseSlug) {
              return respondJson(res, 400, { error: "Título, descrição e conteúdo são obrigatórios." });
            }

            const id = body.id || baseSlug;
            const slug = body.slug || baseSlug;
            const existingFile = request.method === "PUT" ? await findNewsFile(id) : null;
            const filePath = existingFile ?? path.join(newsDir, `${slug}.md`);

            if (request.method === "POST") {
              const uniquePath = filePath;
              if (await fs
                .access(uniquePath)
                .then(() => true)
                .catch(() => false)) {
                const uniqueSlug = `${baseSlug}-${Date.now()}`;
                const uniquePost = {
                  id: uniqueSlug,
                  slug: uniqueSlug,
                  data: body.data || new Date().toISOString().split("T")[0],
                  titulo: body.titulo,
                  descricao: body.descricao,
                  conteudo: body.conteudo,
                  categoria: Array.isArray(body.categoria) ? body.categoria : [],
                  imagem: Array.isArray(body.imagem) ? body.imagem : [],
                  visualizacoes: Number(body.visualizacoes ?? 0),
                };

                await fs.writeFile(path.join(newsDir, `${uniqueSlug}.md`), toMarkdown(uniquePost as Required<NewsPayload>), "utf-8");
                await buildNewsIndex();
                return respondJson(res, 200, { success: true, noticia: uniquePost });
              }
            }

            const post = {
              id,
              slug,
              data: body.data || new Date().toISOString().split("T")[0],
              titulo: body.titulo,
              descricao: body.descricao,
              conteudo: body.conteudo,
              categoria: Array.isArray(body.categoria) ? body.categoria : [],
              imagem: Array.isArray(body.imagem) ? body.imagem : [],
              visualizacoes: Number(body.visualizacoes ?? 0),
            };

            await fs.writeFile(filePath, toMarkdown(post as Required<NewsPayload>), "utf-8");
            await buildNewsIndex();
            return respondJson(res, 200, { success: true, noticia: post });
          }

          if (request.method === "DELETE") {
            const id = url.searchParams.get("id");
            if (!id) return respondJson(res, 400, { error: "ID obrigatório." });

            const file = await findNewsFile(id);
            if (!file) return respondJson(res, 404, { error: "Notícia não encontrada." });

            await fs.unlink(file);
            await buildNewsIndex();
            return respondJson(res, 200, { success: true });
          }

          return respondJson(res, 405, { error: "Método não permitido." });
        }

        if (url.pathname === "/api/media.php") {
          const token = getAccessToken(request.headers);
          await validateSession(token, env);

          if (request.method === "GET") {
            const page = Math.max(1, Number(url.searchParams.get("page") || 1));
            const perPage = Math.min(Math.max(1, Number(url.searchParams.get("perPage") || 12)), 48);
            const result = await listMedia(page, perPage);
            return respondJson(res, 200, { media: result.items, pagination: result.pagination });
          }

          if (request.method === "DELETE") {
            try {
              await deleteMedia(url.searchParams.get("name") || url.searchParams.get("url") || "");
              return respondJson(res, 200, { success: true });
            } catch (error) {
              const message = error instanceof Error ? error.message : "Não foi possível excluir a imagem.";
              const status = message === "Imagem inválida." ? 400 : 404;
              return respondJson(res, status, { error: message });
            }
          }

          if (request.method !== "POST") {
            return respondJson(res, 405, { error: "Método não permitido." });
          }

          const formData = await request.formData();
          const file = formData.get("image");

          if (!(file instanceof File)) {
            return respondJson(res, 400, { error: "Arquivo de imagem obrigatório." });
          }

          if (file.size > 5 * 1024 * 1024) {
            return respondJson(res, 400, { error: "A imagem deve ter no máximo 5MB." });
          }

          const allowedTypes: Record<string, string> = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
            "image/gif": "gif",
          };

          if (!allowedTypes[file.type]) {
            return respondJson(res, 400, { error: "Formato inválido. Use JPG, PNG, WebP ou GIF." });
          }

          const baseName = path.parse(file.name).name;
          const safeName = slugify(baseName) || "imagem";
          const extension = allowedTypes[file.type];
          const finalName = `${safeName}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}.${extension}`;
          const targetPath = path.join(uploadsDir, finalName);

          const buffer = Buffer.from(await file.arrayBuffer());
          await fs.writeFile(targetPath, buffer);

          return respondJson(res, 200, {
            success: true,
            media: {
              name: finalName,
              url: `/uploads/${finalName}`,
              size: file.size,
              modifiedAt: new Date().toISOString(),
            },
          });
        }

        if (url.pathname === "/api/client-tools.php") {
          if (request.method === "GET") {
            return respondJson(res, 200, { tools: await readClientTools() });
          }

          const token = getAccessToken(request.headers);
          await validateSession(token, env);
          const tools = await readClientTools();

          if (request.method === "POST") {
            const body = (await request.json()) as ClientToolPayload;
            const tool = normalizeClientTool(body);
            if (tools.some((item) => item.id === tool.id)) {
              tool.id = `${tool.id}-${Date.now()}`;
            }
            tools.push(tool);
            await writeClientTools(tools);
            return respondJson(res, 200, { success: true, tool });
          }

          if (request.method === "PUT") {
            const body = (await request.json()) as ClientToolPayload;
            if (!body.id) return respondJson(res, 400, { error: "ID obrigatório." });

            const index = tools.findIndex((item) => item.id === body.id);
            if (index === -1) return respondJson(res, 404, { error: "Ferramenta não encontrada." });

            tools[index] = normalizeClientTool(body, tools[index]);
            await writeClientTools(tools);
            return respondJson(res, 200, { success: true });
          }

          if (request.method === "DELETE") {
            const id = url.searchParams.get("id");
            if (!id) return respondJson(res, 400, { error: "ID obrigatório." });

            const next = tools.filter((item) => item.id !== id);
            if (next.length === tools.length) return respondJson(res, 404, { error: "Ferramenta não encontrada." });

            await writeClientTools(next);
            return respondJson(res, 200, { success: true });
          }

          return respondJson(res, 405, { error: "Método não permitido." });
        }
      } catch (error) {
        return respondJson(res, 401, {
          error: error instanceof Error ? error.message : "Erro na API local.",
        });
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, "src"), "");

  return {
    base: "/",
    envDir: "src",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [devNewsApi(env), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
