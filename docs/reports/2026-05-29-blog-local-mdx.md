# Implementation Report: Blog local com MDX + skill /report

**Date:** 2026-05-29  
**Scope:** Migração do blog de Notion (build-time API) para Content Collections MDX, melhorias de SEO/RSS, remoção do stack Notion, e criação da skill Cursor `/report`.

## Executive summary

O blog passou a ser alimentado por arquivos `.mdx` em `src/content/blog/`, com frontmatter validado e geração estática em `/blog/` e `/blog/[slug]/`. A dependência `@notionhq/client`, secrets de CI e o renderizador de blocos Notion foram removidos. Foram adicionados RSS (`/rss.xml`), metadados de artigo no layout e uma skill de projeto para relatórios pós-implementação. `pnpm run lint` e `pnpm run build` passam; o post de rascunho não entra nas rotas estáticas.

## Objective

Implementar o plano **Blog Local Com MDX**: posts versionados no repositório, sem API do Notion no build, mantendo Astro SSG e o visual Neo Brutalism existente.

## What was implemented

- Collection `blog` em [`src/content.config.ts`](src/content.config.ts) com schema Zod (title, slug, summary, publishedAt, draft, lang, tags, cover).
- Helpers em [`src/lib/blog.ts`](src/lib/blog.ts): listagem publicada, ordenação, slug único, filtro de drafts.
- Posts de exemplo: [`src/content/blog/posts-locais-mdx.mdx`](src/content/blog/posts-locais-mdx.mdx) (publicado) e [`src/content/blog/rascunho-exemplo.mdx`](src/content/blog/rascunho-exemplo.mdx) (`draft: true`).
- Refatoração de [`src/pages/blog/index.astro`](src/pages/blog/index.astro) e [`src/pages/blog/[slug].astro`](src/pages/blog/[slug].astro) para MDX + [`BlogProse.module.css`](src/components/blog/BlogProse.module.css).
- [`PostCard.astro`](src/components/blog/PostCard.astro) atualizado (cover local, tags).
- SEO em [`BaseLayout.astro`](src/layouts/BaseLayout.astro): `ogType=article`, `article:published_time` / `modified_time`, Twitter cards, link RSS.
- Feed [`src/pages/rss.xml.ts`](src/pages/rss.xml.ts) via `@astrojs/rss`.
- Remoção de `notion.ts`, componentes Notion, `notion-smoke.ts`, `@notionhq/client`, secrets `NOTION_*` no CI e docs antigas.
- Skill [`/.cursor/skills/report/SKILL.md`](.cursor/skills/report/SKILL.md) e pasta [`docs/reports/`](docs/reports/) para relatórios de handoff.

## Files and areas touched

| Area | Paths or components |
| ---- | ------------------- |
| Content model | `src/content.config.ts`, `src/content/blog/*.mdx` |
| Blog logic | `src/lib/blog.ts` |
| Pages | `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/rss.xml.ts` |
| UI | `PostCard.*`, `BlogProse.module.css`, `blog-post.module.css` |
| Layout / i18n | `BaseLayout.astro`, `src/lib/i18n.ts` (blog CTA) |
| Config / deps | `package.json`, `pnpm-lock.yaml`, `astro.config.mjs` |
| CI / env | `.github/workflows/deploy.yml`, `.env.example` |
| Docs | `README.md`, `docs-blog/blog-plan.md`, `docs-blog/README.md`, `docs/reports/` |
| Removed | `src/lib/notion*.ts`, `NotionBlocks*`, `NotionImage`, `segment-blocks`, `notion-smoke.ts` |

## Technical decisions

- **MDX local vs Notion:** Conteúdo no Git para review, build previsível e sem secrets de blog no CI; trade-off é publicar via PR em vez de editor visual.
- **Mesmo padrão das sessões:** Content Collections + `render()` alinhado ao restante do site Astro.
- **PT-BR only nas rotas `/blog/`:** `lang` no schema reservado; listagem filtra `pt-BR` como antes.
- **`draft: true`:** Excluído de listagem, `getStaticPaths` e RSS (post de teste `rascunho-exemplo`).
- **Skill `/report`:** `disable-model-invocation: true`; relatórios em `docs/reports/` sem colar o texto inteiro no chat.

## Validation

| Check | Result | Notes |
| ----- | ------ | ----- |
| lint | pass | `pnpm run lint` (2026-05-29) |
| build | pass | `pnpm run build` — 36 páginas; `/blog/`, `/blog/posts-locais-mdx/`, `/rss.xml` gerados |
| draft exclusion | pass | Build não emitiu rota para `rascunho-exemplo` |
| manual / other | not run | Preview browser não executado neste relatório |

## Out of scope / not done

- `/en/blog/` e posts em inglês nas rotas do blog.
- Tags com páginas dedicadas (`/blog/tags/[tag]/`).
- Remoção da dependência `shiki` (ainda em `package.json`, sem uso após remoção do highlight Notion).
- Commit ou push das alterações (working tree local na branch `vibe`).

## Follow-ups

- [ ] Commitar mudanças na branch `vibe` (ou abrir PR para `main`).
- [ ] Remover secrets `NOTION_TOKEN` / `NOTION_DATABASE_ID` do GitHub se ainda existirem.
- [ ] Avaliar remoção de `shiki` se não houver outro uso.
- [ ] Adicionar posts reais em `src/content/blog/` e imagens em `public/images/blog/` quando houver covers.

## Risks and notes

- **Deploy:** CI não exige mais Notion; builds de fork/PR devem passar sem secrets de blog.
- **Conteúdo legado:** Posts que estavam só no Notion precisam ser migrados manualmente para MDX.
- **Git:** Grande diff (~1.370 linhas removidas); revisar antes do merge.
- **Staged vs unstaged:** `.cursor/skills/planning/SKILL.md` está staged; demais alterações do blog/report ainda unstaged/untracked.
