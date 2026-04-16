import { useState, useMemo } from 'react';
import { models } from '../../data/models';
import styles from './ModelTaskMatcher.module.css';

interface TaskType {
  id: string;
  label: string;
  keywords: string[];
}

const TASK_TYPES: TaskType[] = [
  {
    id: 'explore',
    label: 'Explorar ideias',
    keywords: [
      'explorar',
      'ideias',
      'rapido',
      'rapidamente',
      'conversacion',
      'gerar',
      'primeira versao',
    ],
  },
  {
    id: 'code',
    label: 'Escrever codigo',
    keywords: ['codigo', 'escrever', 'revisar', 'desenvolvimento', 'dia a dia'],
  },
  {
    id: 'review',
    label: 'Revisar arquitetura',
    keywords: ['revisar', 'arquitetura', 'refactor', 'analise', 'critica'],
  },
  {
    id: 'plan',
    label: 'Planejar implementacao',
    keywords: [
      'planejar',
      'arquitetura',
      'sistemas',
      'logico',
      'complexo',
      'profundo',
      'raciocinio',
    ],
  },
  {
    id: 'analyze',
    label: 'Analisar documentos longos',
    keywords: [
      'analisar',
      'documentos',
      'longos',
      'fontes',
      'sintetizar',
      'informacao',
    ],
  },
  {
    id: 'privacy',
    label: 'Privacidade / rodar local',
    keywords: ['privacidade', 'local', 'fine-tuning', 'open', 'sem custo'],
  },
  {
    id: 'budget',
    label: 'Orcamento limitado',
    keywords: ['custo baixo', 'orcamento', 'open', 'sem custo', 'limitado'],
  },
];

function scoreModel(bestFor: string[], keywords: string[]): number {
  const joined = bestFor.join(' ').toLowerCase();
  return keywords.reduce((score, kw) => {
    return joined.includes(kw.toLowerCase()) ? score + 1 : score;
  }, 0);
}

export default function ModelTaskMatcher() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const task = TASK_TYPES.find((t) => t.id === selectedTask);

  const scored = useMemo(() => {
    if (!task)
      return models.map((m) => ({ model: m, score: 0, matches: false }));
    return models.map((m) => {
      const s = scoreModel(m.bestFor, task.keywords);
      return { model: m, score: s, matches: s > 0 };
    });
  }, [task]);

  const sorted = useMemo(() => {
    return [...scored].sort((a, b) => b.score - a.score);
  }, [scored]);

  return (
    <div className={styles.container}>
      <p className={styles.instruction}>
        {selectedTask
          ? 'Modelos destacados se encaixam melhor nessa tarefa. Clique em outro tipo pra comparar.'
          : 'Escolha um tipo de tarefa pra ver quais modelos se encaixam.'}
      </p>

      <div className={styles.tasks} role="group" aria-label="Tipo de tarefa">
        {TASK_TYPES.map((t) => (
          <button
            key={t.id}
            className={`${styles.taskBtn} ${selectedTask === t.id ? styles.taskActive : ''}`}
            onClick={() => setSelectedTask(selectedTask === t.id ? null : t.id)}
            aria-pressed={selectedTask === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {sorted.map(({ model, matches }) => {
          const isExpanded = expandedId === model.id;
          const dimmed = selectedTask && !matches;

          return (
            <div
              key={model.id}
              className={`${styles.card} ${dimmed ? styles.dimmed : ''}`}
            >
              <button
                className={styles.cardHeader}
                onClick={() => setExpandedId(isExpanded ? null : model.id)}
                aria-expanded={isExpanded}
              >
                <div className={styles.cardTitle}>
                  <span className={styles.modelName}>{model.modelName}</span>
                  <span className={styles.provider}>{model.provider}</span>
                </div>
                <span className={styles.indicator}>
                  {isExpanded ? '\u00d7' : '+'}
                </span>
              </button>

              <div className={styles.cardBody}>
                <p className={styles.product}>Produto: {model.productName}</p>
                {selectedTask && matches && (
                  <span className={styles.matchBadge}>Bom pra essa tarefa</span>
                )}
              </div>

              {isExpanded && (
                <div className={styles.expandedBody}>
                  <div className={styles.section}>
                    <strong>Pontos fortes:</strong>
                    <ul className={styles.list}>
                      {model.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.section}>
                    <strong>Limitacoes:</strong>
                    <ul className={styles.list}>
                      {model.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.section}>
                    <strong>Melhor pra:</strong>
                    <ul className={styles.list}>
                      {model.bestFor.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
