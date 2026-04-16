import { useState, useMemo } from 'react';
import { modelsByLang } from '../../data/models';
import type { Lang } from '../../lib/i18n';
import styles from './ModelTaskMatcher.module.css';

interface TaskType {
  id: string;
  label: string;
  keywords: string[];
}

const TASK_TYPES: Record<Lang, TaskType[]> = {
  'pt-BR': [
    {
      id: 'explore',
      label: 'Explorar ideias',
      keywords: [
        'explorar',
        'ideias',
        'rápido',
        'rapidamente',
        'conversação',
        'gerar',
        'primeira versão',
      ],
    },
    {
      id: 'code',
      label: 'Escrever código',
      keywords: [
        'código',
        'escrever',
        'revisar',
        'desenvolvimento',
        'dia a dia',
      ],
    },
    {
      id: 'review',
      label: 'Revisar arquitetura',
      keywords: ['revisar', 'arquitetura', 'refactor', 'análise', 'crítica'],
    },
    {
      id: 'plan',
      label: 'Planejar implementação',
      keywords: [
        'planejar',
        'arquitetura',
        'sistemas',
        'lógico',
        'complexo',
        'profundo',
        'raciocínio',
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
        'informação',
      ],
    },
    {
      id: 'privacy',
      label: 'Privacidade / rodar local',
      keywords: ['privacidade', 'local', 'fine-tuning', 'open', 'sem custo'],
    },
    {
      id: 'budget',
      label: 'Orçamento limitado',
      keywords: ['custo baixo', 'orçamento', 'open', 'sem custo', 'limitado'],
    },
    {
      id: 'agentic',
      label: 'Trabalho agêntico',
      keywords: ['agêntico', 'autônomo', 'multi-passo', 'agente', 'pipeline'],
    },
  ],
  en: [
    {
      id: 'explore',
      label: 'Explore ideas',
      keywords: ['exploring', 'ideas', 'quickly', 'drafting', 'conversation'],
    },
    {
      id: 'code',
      label: 'Write code',
      keywords: ['code', 'writing', 'reviewing', 'development', 'day-to-day'],
    },
    {
      id: 'review',
      label: 'Review architecture',
      keywords: ['reviewing', 'architecture', 'refactors', 'analysis'],
    },
    {
      id: 'plan',
      label: 'Plan implementation',
      keywords: ['planning', 'architecture', 'complex', 'logic', 'reasoning'],
    },
    {
      id: 'analyze',
      label: 'Analyze long docs',
      keywords: ['analyzing', 'documents', 'sources', 'synthesizing'],
    },
    {
      id: 'privacy',
      label: 'Privacy / local run',
      keywords: ['privacy', 'locally', 'fine-tuning', 'open'],
    },
    {
      id: 'budget',
      label: 'Limited budget',
      keywords: ['low-cost', 'budget', 'open', 'cost'],
    },
    {
      id: 'agentic',
      label: 'Agentic work',
      keywords: ['agentic', 'autonomous', 'multi-step', 'agent', 'pipeline'],
    },
  ],
};

const LABELS = {
  'pt-BR': {
    choose: 'Escolha um tipo de tarefa pra ver os modelos que se encaixam.',
    selected:
      'Modelos destacados se encaixam melhor. Clique em outro tipo pra comparar.',
    taskAria: 'Tipo de tarefa',
    product: 'Produto:',
    match: 'Bom pra essa tarefa',
    strengths: 'Pontos fortes:',
    limitations: 'Limitacoes:',
    bestFor: 'Melhor pra:',
  },
  en: {
    choose: 'Pick a task type to see which models fit.',
    selected: 'Highlighted models fit best. Pick another task to compare.',
    taskAria: 'Task type',
    product: 'Product:',
    match: 'Good fit for this task',
    strengths: 'Strengths:',
    limitations: 'Limitations:',
    bestFor: 'Best for:',
  },
} as const;

function scoreModel(bestFor: string[], keywords: string[]): number {
  const joined = bestFor.join(' ').toLowerCase();
  return keywords.reduce((score, kw) => {
    return joined.includes(kw.toLowerCase()) ? score + 1 : score;
  }, 0);
}

interface Props {
  lang?: Lang;
}

export default function ModelTaskMatcher({ lang = 'pt-BR' }: Props) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const models = modelsByLang[lang];
  const taskTypes = TASK_TYPES[lang];
  const labels = LABELS[lang];

  const task = taskTypes.find((t) => t.id === selectedTask);

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
        {selectedTask ? labels.selected : labels.choose}
      </p>

      <div className={styles.tasks} role="group" aria-label={labels.taskAria}>
        {taskTypes.map((t) => (
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
                <p className={styles.product}>
                  {labels.product} {model.productName}
                </p>
                {selectedTask && matches && (
                  <span className={styles.matchBadge}>{labels.match}</span>
                )}
              </div>

              {isExpanded && (
                <div className={styles.expandedBody}>
                  <div className={styles.section}>
                    <strong>{labels.strengths}</strong>
                    <ul className={styles.list}>
                      {model.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.section}>
                    <strong>{labels.limitations}</strong>
                    <ul className={styles.list}>
                      {model.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.section}>
                    <strong>{labels.bestFor}</strong>
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
