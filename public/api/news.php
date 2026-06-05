<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const SUPABASE_URL = 'https://wvftcwadbfkklbldzvoq.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZnRjd2FkYmZra2xibGR6dm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzEzNjMsImV4cCI6MjA5NTgwNzM2M30.Z15gf8t54RM-Jle-PHrQtgSd1PKvZvIvDEm4xD4dPiE';
const SITE_URL = 'https://www.cyrinocontabilidade.com.br';

$publicDir = realpath(__DIR__ . '/..');
$newsDir = $publicDir . '/news';
$indexPath = $newsDir . '/index.json';
$sitemapPath = $publicDir . '/sitemap.xml';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ensure_news_dir(string $newsDir): void
{
    if (!is_dir($newsDir) && !mkdir($newsDir, 0755, true)) {
        respond(500, ['error' => 'Não foi possível criar a pasta de notícias.']);
    }
}

function request_json(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function authorization_token(): ?string
{
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $header = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? $headers['Authorization']
        ?? $headers['authorization']
        ?? '';

    if (substr($header, 0, 7) !== 'Bearer ') return null;
    return substr($header, 7);
}

function supabase_request(string $url, string $token, ?array $payload = null): array
{
    $headers = [
        'apikey: ' . SUPABASE_PUBLISHABLE_KEY,
        'Authorization: Bearer ' . $token,
    ];

    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_HTTPHEADER => $headers,
    ];

    if ($payload !== null) {
        $options[CURLOPT_POST] = true;
        $options[CURLOPT_POSTFIELDS] = json_encode($payload);
        $options[CURLOPT_HTTPHEADER][] = 'Content-Type: application/json';
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);

    $body = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = is_string($body) && $body !== '' ? json_decode($body, true) : null;

    return [
        'ok' => $body !== false && $status >= 200 && $status < 300,
        'status' => $status,
        'data' => $data,
    ];
}

function assert_admin(): void
{
    $token = authorization_token();
    if (!$token) respond(401, ['error' => 'Sessão ausente.']);

    $userResponse = supabase_request(SUPABASE_URL . '/auth/v1/user', $token);
    if (!$userResponse['ok'] || !is_array($userResponse['data']) || empty($userResponse['data']['id'])) {
        respond(401, ['error' => 'Sessão inválida.']);
    }

    $roleResponse = supabase_request(SUPABASE_URL . '/rest/v1/rpc/has_role', $token, [
        '_user_id' => (string) $userResponse['data']['id'],
        '_role' => 'admin',
    ]);

    if (!$roleResponse['ok'] || $roleResponse['data'] !== true) {
        respond(403, ['error' => 'Acesso negado. Apenas administradores podem alterar notícias.']);
    }
}

function slugify(string $value): string
{
    $value = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value) ?: $value;
    $value = strtolower($value);
    $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?? '';
    $value = trim($value, '-');
    return substr($value, 0, 80);
}

function escape_frontmatter(string $value): string
{
    return trim(str_replace(["\r", "\n", '"'], [' ', ' ', '\"'], $value));
}

function to_markdown(array $post): string
{
    $categoria = json_encode($post['categoria'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $imagem = json_encode($post['imagem'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    return "---\n"
        . "id: {$post['id']}\n"
        . "slug: {$post['slug']}\n"
        . "data: {$post['data']}\n"
        . 'titulo: "' . escape_frontmatter($post['titulo']) . '"' . "\n"
        . 'descricao: "' . escape_frontmatter($post['descricao']) . '"' . "\n"
        . "categoria: {$categoria}\n"
        . "imagem: {$imagem}\n"
        . "visualizacoes: {$post['visualizacoes']}\n"
        . "---\n"
        . trim((string) $post['conteudo']) . "\n";
}

function parse_value(string $value)
{
    $trimmed = trim($value);
    if ($trimmed === '') return '';
    $startsWithArray = substr($trimmed, 0, 1) === '[' && substr($trimmed, -1) === ']';
    $startsWithObject = substr($trimmed, 0, 1) === '{' && substr($trimmed, -1) === '}';
    if ($startsWithArray || $startsWithObject) {
        $decoded = json_decode($trimmed, true);
        if (json_last_error() === JSON_ERROR_NONE) return $decoded;
    }
    if (ctype_digit($trimmed)) return intval($trimmed);
    return trim($trimmed, "\"'");
}

function parse_markdown(string $markdown): array
{
    $frontmatter = '';
    $content = $markdown;

    if (preg_match('/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/', $markdown, $matches)) {
        $frontmatter = $matches[1];
        $content = $matches[2];
    }

    $meta = [];
    foreach (explode("\n", $frontmatter) as $line) {
        $index = strpos($line, ':');
        if ($index === false) continue;
        $key = trim(substr($line, 0, $index));
        $value = substr($line, $index + 1);
        if ($key !== '') $meta[$key] = parse_value($value);
    }

    $imagem = isset($meta['imagem']) && is_array($meta['imagem']) ? array_values($meta['imagem']) : [];
    $categoria = isset($meta['categoria']) && is_array($meta['categoria']) ? array_values($meta['categoria']) : [];

    return [
        'id' => (string) ($meta['id'] ?? $meta['slug'] ?? ''),
        'slug' => (string) ($meta['slug'] ?? $meta['id'] ?? ''),
        'data' => (string) ($meta['data'] ?? date('Y-m-d')),
        'titulo' => (string) ($meta['titulo'] ?? ''),
        'descricao' => (string) ($meta['descricao'] ?? ''),
        'conteudo' => trim($content),
        'categoria' => $categoria,
        'imagem' => $imagem,
        'imagens' => $imagem,
        'visualizacoes' => intval($meta['visualizacoes'] ?? 0),
    ];
}

function markdown_files(string $newsDir): array
{
    ensure_news_dir($newsDir);
    $files = glob($newsDir . '/*.md') ?: [];
    sort($files);
    return $files;
}

function generate_index(string $newsDir, string $indexPath): array
{
    $posts = [];
    foreach (markdown_files($newsDir) as $file) {
        $post = parse_markdown(file_get_contents($file) ?: '');
        unset($post['conteudo']);
        $post['path'] = '/news/' . basename($file);
        $posts[] = $post;
    }

    usort($posts, fn ($a, $b) => strcmp((string) $b['data'], (string) $a['data']));
    file_put_contents($indexPath, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    return $posts;
}

function find_news_file(string $newsDir, string $idOrSlug): ?string
{
    foreach (markdown_files($newsDir) as $file) {
        $post = parse_markdown(file_get_contents($file) ?: '');
        if ($post['id'] === $idOrSlug || $post['slug'] === $idOrSlug) return $file;
    }
    return null;
}

function xml_escape(string $value): string
{
    return htmlspecialchars($value, ENT_XML1 | ENT_COMPAT, 'UTF-8');
}

function sitemap_url(string $path): string
{
    return rtrim(SITE_URL, '/') . '/' . ltrim($path, '/');
}

function category_slug(string $value): string
{
    return slugify($value);
}

function generate_sitemap(array $posts, string $sitemapPath): void
{
    $today = date('Y-m-d');
    $routes = [
        ['loc' => sitemap_url('/'), 'lastmod' => $today, 'priority' => '1.0'],
        ['loc' => sitemap_url('/abrir-empresa'), 'lastmod' => $today, 'priority' => '0.8'],
        ['loc' => sitemap_url('/solucoes'), 'lastmod' => $today, 'priority' => '0.8'],
        ['loc' => sitemap_url('/conteudos'), 'lastmod' => $today, 'priority' => '0.9'],
        ['loc' => sitemap_url('/sobre'), 'lastmod' => $today, 'priority' => '0.6'],
        ['loc' => sitemap_url('/contato'), 'lastmod' => $today, 'priority' => '0.7'],
        ['loc' => sitemap_url('/area-cliente'), 'lastmod' => $today, 'priority' => '0.5'],
    ];

    foreach ($posts as $post) {
        $slug = (string) ($post['slug'] ?? $post['id'] ?? '');
        if ($slug === '') continue;

        $routes[] = [
            'loc' => sitemap_url('/conteudos/' . rawurlencode($slug)),
            'lastmod' => (string) ($post['data'] ?? $today),
            'priority' => '0.8',
        ];
    }

    $categories = [];
    foreach ($posts as $post) {
        $postCategories = is_array($post['categoria'] ?? null) ? $post['categoria'] : [];
        foreach ($postCategories as $category) {
            $category = trim((string) $category);
            if ($category === '') continue;
            $categories[$category] = category_slug($category);
        }
    }

    foreach ($categories as $category => $slug) {
        if ($slug === '') continue;

        $routes[] = [
            'loc' => sitemap_url('/conteudos/categoria/' . rawurlencode($slug)),
            'lastmod' => $today,
            'priority' => '0.7',
        ];
    }

    $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

    foreach ($routes as $route) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>" . xml_escape($route['loc']) . "</loc>\n";
        $xml .= "    <lastmod>" . xml_escape($route['lastmod']) . "</lastmod>\n";
        $xml .= "    <changefreq>weekly</changefreq>\n";
        $xml .= "    <priority>" . xml_escape($route['priority']) . "</priority>\n";
        $xml .= "  </url>\n";
    }

    $xml .= "</urlset>\n";
    file_put_contents($sitemapPath, $xml, LOCK_EX);
}

try {
    ensure_news_dir($newsDir);
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $id = $_GET['id'] ?? null;
        if ($id) {
            $file = find_news_file($newsDir, (string) $id);
            if (!$file) respond(404, ['error' => 'Notícia não encontrada.']);
            respond(200, parse_markdown(file_get_contents($file) ?: ''));
        }

        $posts = generate_index($newsDir, $indexPath);
        generate_sitemap($posts, $sitemapPath);
        respond(200, ['noticias' => $posts]);
    }

    assert_admin();

    if ($method === 'POST' || $method === 'PUT') {
        $body = request_json();
        $baseSlug = slugify((string) ($body['slug'] ?? $body['titulo'] ?? ''));

        if (empty($body['titulo']) || empty($body['descricao']) || empty($body['conteudo']) || !$baseSlug) {
            respond(400, ['error' => 'Título, descrição e conteúdo são obrigatórios.']);
        }

        $id = (string) ($body['id'] ?? $baseSlug);
        $slug = $baseSlug;
        $existingFile = $method === 'PUT' ? find_news_file($newsDir, $id) : null;
        $filePath = $existingFile ?? $newsDir . '/' . $slug . '.md';

        if ($method === 'POST' && file_exists($filePath)) {
            $slug = $baseSlug . '-' . time();
            $id = $slug;
            $filePath = $newsDir . '/' . $slug . '.md';
        }

        $post = [
            'id' => $id,
            'slug' => $slug,
            'data' => (string) ($body['data'] ?? date('Y-m-d')),
            'titulo' => (string) $body['titulo'],
            'descricao' => (string) $body['descricao'],
            'conteudo' => (string) $body['conteudo'],
            'categoria' => isset($body['categoria']) && is_array($body['categoria']) ? array_values($body['categoria']) : [],
            'imagem' => isset($body['imagem']) && is_array($body['imagem']) ? array_values($body['imagem']) : [],
            'visualizacoes' => intval($body['visualizacoes'] ?? 0),
        ];

        file_put_contents($filePath, to_markdown($post), LOCK_EX);
        generate_sitemap(generate_index($newsDir, $indexPath), $sitemapPath);
        respond(200, ['success' => true, 'noticia' => $post]);
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? '';
        if (!$id) respond(400, ['error' => 'ID obrigatório.']);

        $file = find_news_file($newsDir, (string) $id);
        if (!$file) respond(404, ['error' => 'Notícia não encontrada.']);

        unlink($file);
        generate_sitemap(generate_index($newsDir, $indexPath), $sitemapPath);
        respond(200, ['success' => true]);
    }

    respond(405, ['error' => 'Método não permitido.']);
} catch (Throwable $error) {
    respond(500, ['error' => $error->getMessage()]);
}
