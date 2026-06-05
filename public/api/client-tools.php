<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

const SUPABASE_URL = 'https://wvftcwadbfkklbldzvoq.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZnRjd2FkYmZra2xibGR6dm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzEzNjMsImV4cCI6MjA5NTgwNzM2M30.Z15gf8t54RM-Jle-PHrQtgSd1PKvZvIvDEm4xD4dPiE';

$toolsDir = realpath(__DIR__ . '/..') . '/client-tools';
$indexPath = $toolsDir . '/index.json';

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

function ensure_tools_dir(string $toolsDir): void
{
    if (!is_dir($toolsDir) && !mkdir($toolsDir, 0755, true)) {
        respond(500, ['error' => 'Não foi possível criar a pasta de ferramentas.']);
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
        respond(403, ['error' => 'Acesso negado. Apenas administradores podem gerenciar ferramentas.']);
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

function read_tools(string $indexPath): array
{
    if (!file_exists($indexPath)) return [];
    $data = json_decode(file_get_contents($indexPath) ?: '[]', true);
    if (!is_array($data)) return [];

    usort($data, fn ($a, $b) => intval($a['order'] ?? 0) <=> intval($b['order'] ?? 0));
    return $data;
}

function write_tools(string $indexPath, array $tools): void
{
    usort($tools, fn ($a, $b) => intval($a['order'] ?? 0) <=> intval($b['order'] ?? 0));
    file_put_contents($indexPath, json_encode(array_values($tools), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

function normalize_tool(array $body, ?array $existing = null): array
{
    $title = trim((string) ($body['title'] ?? $existing['title'] ?? ''));
    $url = trim((string) ($body['url'] ?? $existing['url'] ?? ''));
    $id = trim((string) ($body['id'] ?? $existing['id'] ?? slugify($title)));

    if ($title === '' || $url === '' || $id === '') {
        respond(400, ['error' => 'Nome e URL são obrigatórios.']);
    }

    return [
        'id' => slugify($id),
        'category' => trim((string) ($body['category'] ?? $existing['category'] ?? '')),
        'title' => $title,
        'image' => trim((string) ($body['image'] ?? $existing['image'] ?? '')),
        'url' => $url,
        'external' => filter_var($body['external'] ?? $existing['external'] ?? true, FILTER_VALIDATE_BOOLEAN),
        'order' => intval($body['order'] ?? $existing['order'] ?? 1),
        'active' => filter_var($body['active'] ?? $existing['active'] ?? true, FILTER_VALIDATE_BOOLEAN),
    ];
}

try {
    ensure_tools_dir($toolsDir);
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        respond(200, ['tools' => read_tools($indexPath)]);
    }

    assert_admin();
    $tools = read_tools($indexPath);

    if ($method === 'POST') {
        $tool = normalize_tool(request_json());
        if (array_values(array_filter($tools, fn ($item) => ($item['id'] ?? '') === $tool['id']))) {
            $tool['id'] = $tool['id'] . '-' . time();
        }
        $tools[] = $tool;
        write_tools($indexPath, $tools);
        respond(200, ['success' => true, 'tool' => $tool]);
    }

    if ($method === 'PUT') {
        $body = request_json();
        $id = (string) ($body['id'] ?? '');
        if ($id === '') respond(400, ['error' => 'ID obrigatório.']);

        $found = false;
        foreach ($tools as $index => $existing) {
            if (($existing['id'] ?? '') === $id) {
                $tools[$index] = normalize_tool($body, $existing);
                $found = true;
                break;
            }
        }
        if (!$found) respond(404, ['error' => 'Ferramenta não encontrada.']);

        write_tools($indexPath, $tools);
        respond(200, ['success' => true]);
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? '';
        if (!$id) respond(400, ['error' => 'ID obrigatório.']);

        $next = array_values(array_filter($tools, fn ($item) => ($item['id'] ?? '') !== $id));
        if (count($next) === count($tools)) respond(404, ['error' => 'Ferramenta não encontrada.']);

        write_tools($indexPath, $next);
        respond(200, ['success' => true]);
    }

    respond(405, ['error' => 'Método não permitido.']);
} catch (Throwable $error) {
    respond(500, ['error' => $error->getMessage()]);
}
