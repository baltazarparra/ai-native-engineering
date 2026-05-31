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

## Blog (local MDX)

The **`/blog/`** section is **static**: each post is an **MDX file** in `src/content/blog/` with frontmatter validated at build time. No Notion API, no blog secrets in CI.

### Publishing workflow

1. Create or edit `src/content/blog/your-slug.mdx` (see [docs-blog/blog-plan.md](docs-blog/blog-plan.md) for the frontmatter contract).
2. Set `draft: false` when the post should go live.
3. Run `pnpm run build` and open **`/blog/`** (detail URLs: **`/blog/{slug}/`**).
4. RSS feed: **`/rss.xml`**.

### Authoring tips

- Use fenced code blocks with a language for syntax highlighting.
- Optional `cover` points to a file under `public/` (e.g. `/images/blog/hero.png`).
- `draft: true` keeps the post off the site, sitemap paths, and RSS.

### Troubleshooting

| Symptom | Likely cause |
| ------- | ------------- |
| Build error: duplicate slug | Two published posts share the same `slug` |
| Post missing from `/blog/` | `draft: true` or wrong `lang` |
| Empty listing but build OK | No published posts in `src/content/blog/` |

### Further reading

- Maintainer reference: [docs-blog/blog-plan.md](docs-blog/blog-plan.md)

## Contributing

Contributions are welcome — whether it's suggesting new content, fixing inaccuracies, or improving clarity.

For **blog posts**, see **[Blog (local MDX)](#blog-local-mdx)** above before changing `src/lib/blog.ts` or blog pages.

- **Report issues or suggest content:** [open an issue](https://github.com/baltazarparra/ai-native-engineering/issues)
- **Start a conversation:** [join the discussions](https://github.com/baltazarparra/ai-native-engineering/discussions)
- **Submit changes:** fork the repo, make your edits, and open a pull request

## License

[MIT](LICENSE)
