import { useState, useMemo } from 'react';
import { glossaryByLang } from '../../data/glossary';
import type { Lang } from '../../lib/i18n';
import styles from './GlossaryCardGrid.module.css';

const ACCENTS = ['yellow', 'blue', 'green', 'coral'] as const;

const LABELS = {
  'pt-BR': {
    searchPlaceholder: 'Buscar termo...',
    searchAria: 'Buscar termo no glossario',
    modeAria: 'Tipo de definição',
    simple: 'Simples',
    technical: 'Técnico',
    empty: (query: string) => `Nenhum termo encontrado pra "${query}".`,
    example: 'Exemplo:',
    commonMistake: 'Erro comum:',
    relatedTerms: 'Termos relacionados:',
  },
  en: {
    searchPlaceholder: 'Search term...',
    searchAria: 'Search glossary term',
    modeAria: 'Definition type',
    simple: 'Simple',
    technical: 'Technical',
    empty: (query: string) => `No term found for "${query}".`,
    example: 'Example:',
    commonMistake: 'Common mistake:',
    relatedTerms: 'Related terms:',
  },
} as const;

interface Props {
  lang?: Lang;
}

export default function GlossaryCardGrid({ lang = 'pt-BR' }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState<'simple' | 'technical'>('simple');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const glossary = glossaryByLang[lang];
  const labels = LABELS[lang];

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return glossary;
    const q = searchQuery.toLowerCase().trim();
    return glossary.filter(
      (t) => t.term.toLowerCase().includes(q) || t.id.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const handleRelatedClick = (term: string) => {
    setSearchQuery(term);
    setExpandedId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          className={styles.search}
          placeholder={labels.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label={labels.searchAria}
        />
        <div
          className={styles.toggle}
          role="group"
          aria-label={labels.modeAria}
        >
          <button
            className={`${styles.toggleBtn} ${mode === 'simple' ? styles.toggleActive : ''}`}
            onClick={() => setMode('simple')}
            aria-pressed={mode === 'simple'}
          >
            {labels.simple}
          </button>
          <button
            className={`${styles.toggleBtn} ${mode === 'technical' ? styles.toggleActive : ''}`}
            onClick={() => setMode('technical')}
            aria-pressed={mode === 'technical'}
          >
            {labels.technical}
          </button>
        </div>
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>{labels.empty(searchQuery)}</p>
      )}

      <div className={styles.grid}>
        {filtered.map((term, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const isExpanded = expandedId === term.id;

          return (
            <div
              key={term.id}
              className={`${styles.card} ${styles[`accent-${accent}`]}`}
            >
              <button
                className={styles.cardHeader}
                onClick={() => setExpandedId(isExpanded ? null : term.id)}
                aria-expanded={isExpanded}
              >
                <span className={styles.termName}>{term.term}</span>
                <span className={styles.indicator}>
                  {isExpanded ? '\u00d7' : '+'}
                </span>
              </button>

              <div className={styles.cardBody}>
                <p className={styles.definition}>
                  {mode === 'simple'
                    ? term.simpleDefinition
                    : term.technicalDefinition}
                </p>
              </div>

              {isExpanded && (
                <div className={styles.expandedBody}>
                  <div className={styles.detail}>
                    <strong>{labels.example}</strong>
                    <p>{term.example}</p>
                  </div>
                  <div className={styles.detail}>
                    <strong>{labels.commonMistake}</strong>
                    <p>{term.commonMistake}</p>
                  </div>
                  {term.relatedTerms.length > 0 && (
                    <div className={styles.related}>
                      <strong>{labels.relatedTerms}</strong>
                      <div className={styles.relatedTags}>
                        {term.relatedTerms.map((rt) => (
                          <button
                            key={rt}
                            className={styles.tag}
                            onClick={() => handleRelatedClick(rt)}
                          >
                            {rt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
