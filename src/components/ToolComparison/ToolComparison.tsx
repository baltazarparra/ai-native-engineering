import { useState, useMemo } from 'react';
import { tools } from '../../data/tools';
import type { ToolCategory } from '../../data/tools';
import styles from './ToolComparison.module.css';

type CategoryFilter = 'all' | ToolCategory;

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'ide', label: 'IDEs' },
  { value: 'cli', label: 'CLI' },
];

const PROFILES = [
  { value: 'all', label: 'Todos' },
  { value: 'junior', label: 'Dev junior' },
  { value: 'senior', label: 'Dev senior' },
  { value: 'qa', label: 'QA' },
  { value: 'lead', label: 'Lideranca' },
];

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

const CATEGORY_LABELS: Record<ToolCategory, string> = {
  ide: 'IDE',
  cli: 'CLI',
  agent: 'Agente',
};

export default function ToolComparison() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [profile, setProfile] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          <span className={styles.filterLabel}>Categoria:</span>
          <div
            className={styles.filterButtons}
            role="group"
            aria-label="Filtrar por categoria"
          >
            {CATEGORIES.map((c) => (
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
          <span className={styles.filterLabel}>Perfil:</span>
          <div
            className={styles.filterButtons}
            role="group"
            aria-label="Filtrar por perfil"
          >
            {PROFILES.map((p) => (
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
        Mostrando {filtered.length} de {tools.length} ferramentas
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
                    {CATEGORY_LABELS[tool.category]}
                  </span>
                </div>
                <span className={styles.indicator}>
                  {isExpanded ? '\u00d7' : '+'}
                </span>
              </button>

              <div className={styles.cardBody}>
                <p className={styles.meta}>
                  <strong>Onde roda:</strong> {tool.whereItRuns}
                </p>
                <p className={styles.meta}>
                  <strong>Melhor pra:</strong> {tool.bestFor}
                </p>
              </div>

              {isExpanded && (
                <div className={styles.expandedBody}>
                  <div className={styles.columns}>
                    <div className={styles.column}>
                      <strong className={styles.columnTitle}>
                        Onde brilha
                      </strong>
                      <ul className={styles.list}>
                        {tool.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.column}>
                      <strong className={styles.columnTitle}>
                        Onde tropeca
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

      {filtered.length === 0 && (
        <p className={styles.empty}>
          Nenhuma ferramenta encontrada com esses filtros.
        </p>
      )}
    </div>
  );
}
