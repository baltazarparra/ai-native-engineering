# AI-Native Engineers

**No hype. No empty buzzwords. Just the map that matters.**

An educational, interactive, visually strong website that teaches what you actually need to understand to work in engineering in a world of agents, using accessible, human language.

[Visit the site](https://ai-native-engineers.com)

## The Problem

The market already treats AI as a normal part of software work. Adoption is massive, perceived productivity has increased, but trust has not kept up. The gap is not between using AI and not using it; it is between **using it poorly** and **using it well**.

This site exists to close that gap: to organize the chaos, translate the terminology, and show that AI-native engineering is about **context, judgment, validation, and flow**, not about "asking for code."

## Who It Is For

- QA, Product Managers, Product Designers, Tech Recruiters, founders, and technology leaders
- Junior and mid-level developers who still mix up tools, models, agents, CLIs, and workflows
- Any curious person who wants a clear mental map of the topic

## Content

The home page starts with a compact foundations primer, then the site continues through 3 progressive sessions:

| #   | Session                | Route                    | What It Teaches                                                |
| --- | ---------------------- | ------------------------ | -------------------------------------------------------------- |
| 1   | Glossary               | `/sessions/glossario/`   | LLM, model, token, prompt, agent, harness, MCP, and more       |
| 2   | Tools and Models       | `/sessions/ferramentas/` | IDEs, CLIs, cloud agents, product vs model, task-fit choices   |
| 3   | SDD and Harness Design | `/sessions/maturidade/`  | Spec-driven contracts, agent harnesses, validation, governance |

Each session follows a fixed template: 30-second summary, main explanation, why it matters, real example when useful, where it breaks, takeaway, and references. Interactive blocks are included only when they clearly improve learning.

## Editorial Principles

- Teach without idolizing tools, showing categories and patterns instead
- Simple explanation first, technical depth second
- Examples from QA, PM, and product, not only hardcore development
- Every interaction must explain better, organize better, or improve retention
- Acronyms are explained before any deep dive

## Blog (Notion)

The **`/blog/`** section is a **static** slice of the site: posts are authored in a **Notion database** and fetched **only at build time** (`astro build`). There is no Notion API in the browser and no blog backend.

### Prerequisites

- **Node.js 22.x** (see `engines` in `package.json`)
- **pnpm**
- Access to a Notion workspace where you can create an integration and database

### Notion setup

1. **Create an integration** at [Notion integrations](https://www.notion.so/my-integrations) and copy the **internal integration secret** → `NOTION_TOKEN`.
2. **Create a database** with these properties (names must match exactly):

   | Property      | Notion type | Notes                          |
   | ------------- | ----------- | ------------------------------ |
   | Title         | Title       | Post title                     |
   | Slug          | Rich text   | URL segment; unique when Published |
   | Status        | Select      | `Published` or `Draft`           |
   | PublishedAt   | Date        | Listing sort (newest first)    |
   | Summary       | Rich text   | Card / meta description        |
   | Cover         | Files       | Optional hero image            |

3. **Share the database** (or parent page) with your integration so API queries succeed.
4. Copy the **database UUID** from the Notion URL → `NOTION_DATABASE_ID`.

Canonical contract: [docs-blog/blog-plan.md](docs-blog/blog-plan.md).

### Local environment

```bash
cp .env.example .env
# Edit .env — set NOTION_TOKEN and NOTION_DATABASE_ID (never commit .env)
pnpm install
pnpm run build
pnpm run preview
```

Open **`/blog/`** in the preview server. Post detail URLs are **`/blog/{slug}/`**.

Optional env check (does not print secrets):

```bash
pnpm exec tsx notion-smoke.ts
```

### CI / GitHub Actions

Production deploys use [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (`push` to **`main`** or **workflow_dispatch**). The build step needs the same variables as local development, supplied as **encrypted repository secrets** (never commit them):

| Secret name | Purpose |
| ----------- | ------- |
| `NOTION_TOKEN` | Notion integration secret |
| `NOTION_DATABASE_ID` | Blog database UUID |

**Setup:** Repository **Settings → Secrets and variables → Actions → New repository secret** for each name.

**Policy:** If either secret is missing on a production deploy, the build **fails** with a missing-environment error from `src/lib/notion.ts` — the site does not silently ship an empty blog.

**Forks and pull requests:** GitHub does not expose upstream repository secrets to workflows from untrusted forks. Fork PR CI may fail on `pnpm run build` without Notion env; use a local **`.env`** when working on blog features. Org admins can configure secrets on the canonical repository.

**Rotation:** Update the secret in GitHub, then re-run the deploy workflow (or push to `main`).

### Publishing workflow

- Set **Status** to **Published** for rows that should appear on the site.
- **Draft** rows are excluded from the listing and from static paths.
- Each **Published** row needs a non-empty, **unique** **Slug** (duplicate slugs fail the build).

### Authoring tips

- Use Notion **`/code`** blocks (with a language) for syntax highlighting on the site.
- **Cover** and in-body **image** blocks are optimised at build time via Astro’s image pipeline; allowed remote hosts are listed in [`astro.config.mjs`](astro.config.mjs) (`image.remotePatterns`).
- **Rebuild and redeploy** after content changes. Notion file URLs may be time-limited; a new build refreshes embedded assets.

### Troubleshooting

| Symptom | Likely cause |
| ------- | ------------- |
| Build error: missing `NOTION_TOKEN` / `NOTION_DATABASE_ID` | `.env` not set or variable names wrong |
| Build error: duplicate slug | Two Published rows share the same **Slug** |
| Empty `/blog/` but build succeeds | No rows with **Status = Published**, or empty database |
| Images broken after deploy | Signed URL expired — trigger a rebuild |

### Further reading

- Maintainer reference: [docs-blog/blog-plan.md](docs-blog/blog-plan.md)

## Contributing

Contributions are welcome — whether it's suggesting new content, fixing inaccuracies, or improving clarity.

For **Notion-backed blog posts**, see **[Blog (Notion)](#blog-notion)** above before changing `src/lib/notion.ts` or blog pages.

- **Report issues or suggest content:** [open an issue](https://github.com/baltazarparra/ai-native-engineering/issues)
- **Start a conversation:** [join the discussions](https://github.com/baltazarparra/ai-native-engineering/discussions)
- **Submit changes:** fork the repo, make your edits, and open a pull request

## License

[MIT](LICENSE)
