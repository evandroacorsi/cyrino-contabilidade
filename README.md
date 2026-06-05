# Cyrino Contabilidade - Website Oficial

Site institucional da Cyrino Contabilidade, desenvolvido com React, TypeScript, Vite, Tailwind CSS e shadcn-ui.

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui
- React Router
- Supabase Auth
- PHP para o CRUD local do blog em arquivos Markdown

## Blog e Painel Administrativo

O blog funciona em modelo parecido com WordPress:

- O painel `/admin` exige login pelo Supabase.
- Criar, editar e excluir noticia chama `api/news.php`.
- O PHP valida a sessao ativa no Supabase antes de gravar.
- As noticias ficam salvas localmente no servidor, na pasta `news/`, em arquivos `.md`.
- Imagens enviadas pelo painel ficam salvas localmente no servidor, na pasta `uploads/`.
- A biblioteca de imagens do admin lista os arquivos de `uploads/` e permite reutilizar imagens na capa/carrossel ou no meio do conteúdo.
- O indice publico fica em `news/index.json`.
- A pagina `/conteudos` lista as noticias a partir desse indice.
- A pagina `/conteudos/:slug` le o arquivo Markdown da noticia.

O Supabase e usado apenas para autenticacao. As noticias nao sao salvas no Supabase.

## Requisitos Para Testar Localmente

- Node.js
- npm

## Rodar em Desenvolvimento

```sh
npm install
npm run dev
```

O Vite abre em:

```text
http://localhost:8080/
```

Nesse modo, o Vite já simula a API do blog para leitura e escrita local. O admin, a lista pública e a biblioteca de imagens gravam em `public/news` e `public/uploads`, então você consegue testar sem PHP no localhost.

Se você quiser testar o pacote final exatamente como vai para a hospedagem, use o fluxo de `dist` abaixo.

## Testar o Blog Como no Servidor Oficial

Gere o build:

```sh
npm run build
```

Valide a sintaxe do PHP:

```sh
php -l public/api/news.php
```

Suba o `dist` com o servidor PHP local:

```sh
php -S 127.0.0.1:8090 -t dist
```

Acesse:

```text
http://127.0.0.1:8090/
http://127.0.0.1:8090/conteudos
http://127.0.0.1:8090/auth
http://127.0.0.1:8090/admin
```

Teste rapido da API publica:

```sh
curl http://127.0.0.1:8090/api/news.php
```

Teste rapido da protecao de escrita:

```sh
curl -X POST http://127.0.0.1:8090/api/news.php \
  -H "Content-Type: application/json" \
  --data '{"titulo":"Teste","descricao":"Resumo","conteudo":"Conteudo"}'
```

Sem login, a resposta esperada e:

```json
{"error":"Sessão ausente."}
```

## Publicar no Servidor Oficial

1. Rode o build:

```sh
npm run build
```

2. Envie todo o conteudo da pasta `dist/` para a raiz publica do site no servidor oficial.

Exemplo de arquivos importantes que precisam ir junto:

```text
dist/index.html
dist/assets/
dist/api/news.php
dist/api/media.php
dist/news/index.json
dist/uploads/
dist/.htaccess
```

3. Garanta que o servidor tenha PHP 8+ com `curl` habilitado.

4. Garanta permissao de escrita para as pastas `news/` e `uploads/`.

O PHP precisa criar, editar e apagar arquivos `.md` em `news/`, atualizar `news/index.json` e salvar imagens em `uploads/`.

Em hospedagens Linux/Apache, normalmente:

```sh
chmod 755 news
chmod 664 news/index.json
chmod 755 uploads
```

Se o PHP ainda nao conseguir gravar, ajuste a propriedade/permissao conforme o usuario do servidor web usado pela hospedagem.

5. No Apache/cPanel, mantenha o arquivo `.htaccess` enviado no `dist`. Ele faz as rotas React funcionarem em refresh direto e preserva o acesso a `/api/news.php`.

6. Depois de subir, teste no navegador:

```text
https://dominio.com.br/conteudos
https://dominio.com.br/auth
https://dominio.com.br/admin
https://dominio.com.br/api/news.php
```

## Observacoes de Hospedagem

- Se o servidor for Nginx, o `.htaccess` nao sera usado. Nesse caso, configure fallback das rotas para `index.html`, mantendo `/api/news.php` como arquivo PHP real.
- O endpoint `api/news.php` precisa conseguir acessar `https://wvftcwadbfkklbldzvoq.supabase.co/auth/v1/user` para validar a sessao.
- O endpoint `api/media.php` tambem valida a sessao no Supabase antes de listar ou enviar imagens.
- Se houver cache agressivo no servidor/CDN, desative cache para:
  - `/api/news.php`
  - `/api/media.php`
  - `/news/index.json`
  - `/news/*.md`
  - `/uploads/*`

## Fluxo Local x Produção

- No `npm run dev`, o Vite grava e lê o blog em `public/news` e `public/uploads`.
- No `npm run build`, esses arquivos entram no `dist` junto com os scripts PHP para a hospedagem.
- Se um conteúdo antigo só existia em `dist`, ele pode ter sido sobrescrito por uma build anterior. Nesse caso, recrie a notícia uma vez no fluxo atual para que ela passe a existir também em `public/`.

## Scripts

```sh
npm run dev
npm run build
npm run preview
```
