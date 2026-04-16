import { useState, useMemo } from 'react';
import { glossary } from '../../data/glossary';
import styles from './GlossaryCardGrid.module.css';

const ACCENTS = ['yellow', 'blue', 'green', 'coral'] as const;

export default function GlossaryCardGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState<'simple' | 'technical'>('simple');
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          placeholder="Buscar termo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Buscar termo no glossario"
        />
        <div
          className={styles.toggle}
          role="group"
          aria-label="Tipo de definicao"
        >
          <button
            className={`${styles.toggleBtn} ${mode === 'simple' ? styles.toggleActive : ''}`}
            onClick={() => setMode('simple')}
            aria-pressed={mode === 'simple'}
          >
            Simples
          </button>
          <button
            className={`${styles.toggleBtn} ${mode === 'technical' ? styles.toggleActive : ''}`}
            onClick={() => setMode('technical')}
            aria-pressed={mode === 'technical'}
          >
            Tecnico
          </button>
        </div>
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>
          Nenhum termo encontrado pra "{searchQuery}".
        </p>
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
                    <strong>Exemplo:</strong>
                    <p>{term.example}</p>
                  </div>
                  <div className={styles.detail}>
                    <strong>Erro comum:</strong>
                    <p>{term.commonMistake}</p>
                  </div>
                  {term.relatedTerms.length > 0 && (
                    <div className={styles.related}>
                      <strong>Termos relacionados:</strong>
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
