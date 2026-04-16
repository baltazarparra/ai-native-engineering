import { useState, useMemo } from 'react';
import { toolsByLang } from '../../data/tools';
import type { ToolCategory } from '../../data/tools';
import type { Lang } from '../../lib/i18n';
import styles from './ToolComparison.module.css';

type CategoryFilter = 'all' | ToolCategory;

const LABELS = {
  'pt-BR': {
    categories: [
      { value: 'all', label: 'Todas' },
      { value: 'ide', label: 'IDEs' },
      { value: 'cli', label: 'CLI' },
    ] satisfies { value: CategoryFilter; label: string }[],
    profiles: [
      { value: 'all', label: 'Todos' },
      { value: 'junior', label: 'Dev junior' },
      { value: 'senior', label: 'Dev senior' },
      { value: 'qa', label: 'QA' },
      { value: 'lead', label: 'Lideranca' },
    ],
    categoryLabel: 'Categoria:',
    categoryAria: 'Filtrar por categoria',
    profileLabel: 'Perfil:',
    profileAria: 'Filtrar por perfil',
    count: (visible: number, total: number) =>
      `Mostrando ${visible} de ${total} ferramentas`,
    whereItRuns: 'Onde roda:',
    bestFor: 'Melhor pra:',
    strengths: 'Onde brilha',
    risks: 'Onde tropeca',
    empty: 'Nenhuma ferramenta encontrada com esses filtros.',
  },
  en: {
    categories: [
      { value: 'all', label: 'All' },
      { value: 'ide', label: 'IDEs' },
      { value: 'cli', label: 'CLI' },
    ] satisfies { value: CategoryFilter; label: string }[],
    profiles: [
      { value: 'all', label: 'All' },
      { value: 'junior', label: 'Junior dev' },
      { value: 'senior', label: 'Senior dev' },
      { value: 'qa', label: 'QA' },
      { value: 'lead', label: 'Leadership' },
    ],
    categoryLabel: 'Category:',
    categoryAria: 'Filter by category',
    profileLabel: 'Profile:',
    profileAria: 'Filter by profile',
    count: (visible: number, total: number) =>
      `Showing ${visible} of ${total} tools`,
    whereItRuns: 'Where it runs:',
    bestFor: 'Best for:',
    strengths: 'Where it shines',
    risks: 'Where it trips',
    empty: 'No tool found with these filters.',
  },
} as const;

function matchesProfile(targetUsers: string[], profile: string): boolean {
  const lower = targetUsers.map((u) => u.toLowerCase());
  switch (profile) {
    case 'junior':
      return lower.some((u) => u.includes('junior'));
    case 'senior':
      return lower.some(
        (u) =>
          u.includes('senior') ||
          u.includes('fullstack') ||
          u.includes('terminal') ||
          u.includes('open source') ||
          u.includes('openai'),
      );
    case 'qa':
      return lower.some((u) => u.includes('qa') || u.includes('devops'));
    case 'lead':
      return lower.some((u) => u.includes('tech lead') || u.includes('lead'));
    default:
      return true;
  }
}

const CATEGORY_LABELS: Record<Lang, Record<ToolCategory, string>> = {
  'pt-BR': {
    ide: 'IDE',
    cli: 'CLI',
    agent: 'Agente',
  },
  en: {
    ide: 'IDE',
    cli: 'CLI',
    agent: 'Agent',
  },
};

interface Props {
  lang?: Lang;
}

export default function ToolComparison({ lang = 'pt-BR' }: Props) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [profile, setProfile] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const tools = toolsByLang[lang];
  const labels = LABELS[lang];

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      if (category !== 'all' && tool.category !== category) return false;
      if (profile !== 'all' && !matchesProfile(tool.targetUsers, profile))
        return false;
      return true;
    });
  }, [category, profile]);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>{labels.categoryLabel}</span>
          <div
            className={styles.filterButtons}
            role="group"
            aria-label={labels.categoryAria}
          >
            {labels.categories.map((c) => (
              <button
                key={c.value}
                className={`${styles.filterBtn} ${category === c.value ? styles.filterActive : ''}`}
                onClick={() => setCategory(c.value)}
                aria-pressed={category === c.value}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>{labels.profileLabel}</span>
          <div
            className={styles.filterButtons}
            role="group"
            aria-label={labels.profileAria}
          >
            {labels.profiles.map((p) => (
              <button
                key={p.value}
                className={`${styles.filterBtn} ${profile === p.value ? styles.filterActive : ''}`}
                onClick={() => setProfile(p.value)}
                aria-pressed={profile === p.value}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.count}>
        {labels.count(filtered.length, tools.length)}
      </p>

      <div className={styles.grid}>
        {filtered.map((tool) => {
          const isExpanded = expandedId === tool.id;
          return (
            <div key={tool.id} className={styles.card}>
              <button
                className={styles.cardHeader}
                onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                aria-expanded={isExpanded}
              >
                <div className={styles.cardTitle}>
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.badge}>
                    {CATEGORY_LABELS[lang][tool.category]}
                  </span>
                </div>
                <span className={styles.indicator}>
                  {isExpanded ? '\u00d7' : '+'}
                </span>
              </button>

              <div className={styles.cardBody}>
                <p className={styles.meta}>
                  <strong>{labels.whereItRuns}</strong> {tool.whereItRuns}
                </p>
                <p className={styles.meta}>
                  <strong>{labels.bestFor}</strong> {tool.bestFor}
                </p>
              </div>

              {isExpanded && (
                <div className={styles.expandedBody}>
                  <div className={styles.columns}>
                    <div className={styles.column}>
                      <strong className={styles.columnTitle}>
                        {labels.strengths}
                      </strong>
                      <ul className={styles.list}>
                        {tool.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.column}>
                      <strong className={styles.columnTitle}>
                        {labels.risks}
                      </strong>
                      <ul className={styles.list}>
                        {tool.commonRisks.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && <p className={styles.empty}>{labels.empty}</p>}
    </div>
  );
}
