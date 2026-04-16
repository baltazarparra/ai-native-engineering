import { useState, useCallback } from 'react';
import type { Lang } from '../../lib/i18n';
import styles from './MaturityStepper.module.css';

interface Phase {
  title: string;
  shortLabel: string;
  description: string;
  whereFits: string[];
  whereBreaks: string[];
  nextFixes: string;
}

const PHASES: Phase[] = [
  {
    title: 'Fase 1: Consulta',
    shortLabel: 'Consulta',
    description:
      'Voce abre um chat de IA (ChatGPT, Claude, Gemini) e faz perguntas. Copia a resposta e cola no seu trabalho. A IA funciona como um Google melhorado.',
    whereFits: [
      'Duvidas rapidas sobre APIs e sintaxe',
      'Gerar snippets simples pra adaptar',
      'Explorar ideias antes de implementar',
      'PM pedindo resumo de documento tecnico',
    ],
    whereBreaks: [
      'Copiar codigo sem entender o que faz',
      'Sem contexto do projeto, resposta generica',
      'Sem iteracao: pergunta, copia, vai embora',
    ],
    nextFixes:
      'Integra IA no editor, eliminando copy-paste e dando contexto de codigo automatico.',
  },
  {
    title: 'Fase 2: Autocomplete',
    shortLabel: 'Autocomplete',
    description:
      'Voce instala uma extensao de IA no editor (Copilot, Cursor, Windsurf) e ela sugere codigo enquanto voce digita. A IA vem ate voce, no contexto do que voce esta escrevendo.',
    whereFits: [
      'Completar funcoes que seguem padroes claros',
      'Escrever testes unitarios simples',
      'Gerar boilerplate (forms, handlers)',
      'Descobrir APIs enquanto digita',
    ],
    whereBreaks: [
      'Aceitar sugestoes sem ler',
      'Contexto limitado ao arquivo atual',
      'Dependencia: se a IA para, voce para?',
    ],
    nextFixes:
      'Remove o controle granular de cada linha e coloca a IA pra gerar blocos inteiros a partir de texto.',
  },
  {
    title: 'Fase 3: Vibe Coding',
    shortLabel: 'Vibe Coding',
    description:
      'Voce descreve o que quer em texto natural e a IA gera blocos inteiros de codigo. Em vez de digitar linha por linha, voce diz o que precisa e a IA escreve.',
    whereFits: [
      'Prototipos rapidos que nao vao pra producao',
      'MVPs onde velocidade importa mais que qualidade',
      'Explorar abordagens antes de escolher',
      'PM ou designer criando prototipos funcionais',
    ],
    whereBreaks: [
      'Sem spec, sem controle do que e gerado',
      'Divida tecnica instantanea (sem tipos, sem testes)',
      'Falsa sensacao de produtividade',
    ],
    nextFixes:
      'Substitui descricao vaga por especificacao clara. "Faz pra mim" vira "implementa segundo esta spec".',
  },
  {
    title: 'Fase 4: SDD',
    shortLabel: 'SDD',
    description:
      'Voce escreve uma especificacao antes de pedir qualquer coisa pra IA. A spec define endpoints, tipos, restricoes, comportamentos. O output e validado contra a spec, nao contra a "vibe".',
    whereFits: [
      'Features com complexidade real',
      'Times com multiplas pessoas no mesmo modulo',
      'Projetos com revisao critica (compliance, seguranca)',
      'QA gerando cenarios de teste a partir de specs',
    ],
    whereBreaks: [
      'Over-engineering: spec de 3 paginas pra consertar um typo',
      'Spec sem validacao do output',
      'Spec desatualizada vira documentacao morta',
    ],
    nextFixes:
      'Automatiza a validacao e orquestracao. O sistema valida, nao o humano em cada passo.',
  },
  {
    title: 'Fase 5: Harness Engineering',
    shortLabel: 'Harness',
    description:
      'Voce constroi um sistema completo pro agente: instrucoes persistentes, ferramentas configuradas, validacao automatica, criterios de aceite. O agente opera dentro do sistema com autonomia controlada.',
    whereFits: [
      'Projetos grandes com convencoes estabelecidas',
      'Times com testes, lint e CI funcionando',
      'Refactors de grande escala',
      'Workflows repetiveis executados com frequencia',
    ],
    whereBreaks: [
      'Complexidade prematura pra projetos simples',
      'Confianca excessiva na automacao',
      'Custo de manutencao do harness',
    ],
    nextFixes: '',
  },
];

const PHASES_BY_LANG: Record<Lang, Phase[]> = {
  'pt-BR': PHASES,
  en: [
    {
      title: 'Phase 1: Ask',
      shortLabel: 'Ask',
      description:
        'You open an AI chat and ask questions. You copy the answer into your work. AI works like a better search engine.',
      whereFits: [
        'Quick questions about APIs and syntax',
        'Simple snippets you will adapt',
        'Exploring ideas before implementation',
        'PM summarizing a technical document',
      ],
      whereBreaks: [
        'Copying code without understanding it',
        'No project context means generic answers',
        'No iteration: ask, copy, leave',
      ],
      nextFixes:
        'Bring AI into the editor, removing copy-paste and adding automatic code context.',
    },
    {
      title: 'Phase 2: Autocomplete',
      shortLabel: 'Autocomplete',
      description:
        'You use an AI extension or AI IDE and it suggests code while you type. AI comes to you inside the file context.',
      whereFits: [
        'Completing functions with clear patterns',
        'Writing simple unit tests',
        'Generating boilerplate',
        'Discovering APIs while typing',
      ],
      whereBreaks: [
        'Accepting suggestions without reading',
        'Context limited to current or nearby files',
        'Dependency: if AI stops, do you stop too?',
      ],
      nextFixes:
        'Move from line-by-line control to larger blocks generated from natural language.',
    },
    {
      title: 'Phase 3: Vibe Coding',
      shortLabel: 'Vibe Coding',
      description:
        'You describe what you want in natural language and AI generates whole blocks of code. You guide the outcome instead of typing every line.',
      whereFits: [
        'Quick prototypes that will not go to production',
        'MVPs where speed matters more than quality',
        'Exploring approaches before choosing one',
        'PMs or designers creating functional prototypes',
      ],
      whereBreaks: [
        'No spec means no control',
        'Instant technical debt without types or tests',
        'Fake productivity from unread generated code',
      ],
      nextFixes:
        'Replace vague description with a clear spec: implement according to this, not just the vibe.',
    },
    {
      title: 'Phase 4: SDD',
      shortLabel: 'SDD',
      description:
        'You write a spec before asking AI to implement. The spec defines endpoints, types, constraints, behavior, and edge cases.',
      whereFits: [
        'Features with real complexity',
        'Teams sharing work in the same module',
        'Projects with critical review needs',
        'QA generating scenarios from specs',
      ],
      whereBreaks: [
        'Over-engineering a spec for trivial work',
        'Spec without output validation',
        'Stale specs becoming dead documentation',
      ],
      nextFixes:
        'Automate validation and orchestration so the system checks more of the work.',
    },
    {
      title: 'Phase 5: Harness Engineering',
      shortLabel: 'Harness',
      description:
        'You build a full system around the agent: persistent instructions, configured tools, automated validation, and acceptance criteria.',
      whereFits: [
        'Large projects with established conventions',
        'Teams with tests, lint, and CI working',
        'Large-scale refactors',
        'Repeated workflows executed often',
      ],
      whereBreaks: [
        'Premature complexity for small projects',
        'Overtrusting automation',
        'Maintenance cost for the harness',
      ],
      nextFixes: '',
    },
  ],
};

const LABELS = {
  'pt-BR': {
    previousAria: 'Fase anterior',
    nextAria: 'Proxima fase',
    tabAria: 'Fases de maturidade',
    whereFits: 'Onde funciona',
    whereBreaks: 'Onde quebra',
    nextFixes: 'O que a proxima fase resolve:',
  },
  en: {
    previousAria: 'Previous phase',
    nextAria: 'Next phase',
    tabAria: 'Maturity phases',
    whereFits: 'Where it works',
    whereBreaks: 'Where it breaks',
    nextFixes: 'What the next phase solves:',
  },
} as const;

interface Props {
  lang?: Lang;
}

export default function MaturityStepper({ lang = 'pt-BR' }: Props) {
  const [active, setActive] = useState(0);
  const phases = PHASES_BY_LANG[lang];
  const labels = LABELS[lang];

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((prev) => Math.min(prev + 1, phases.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((prev) => Math.max(prev - 1, 0));
      }
    },
    [phases.length],
  );

  const phase = phases[active];

  return (
    <div className={styles.container}>
      <div className={styles.stepperRow}>
        <button
          className={styles.navBtn}
          onClick={() => setActive((p) => Math.max(p - 1, 0))}
          disabled={active === 0}
          aria-label={labels.previousAria}
        >
          &larr;
        </button>

        <div
          className={styles.steps}
          role="tablist"
          aria-label={labels.tabAria}
          onKeyDown={handleKeyDown}
        >
          {phases.map((p, i) => (
            <button
              key={i}
              id={`phase-tab-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-controls={`phase-panel-${i}`}
              aria-label={p.title}
              className={`${styles.step} ${i === active ? styles.stepActive : ''} ${i < active ? styles.stepDone : ''}`}
              onClick={() => setActive(i)}
              tabIndex={i === active ? 0 : -1}
            >
              <span className={styles.stepCircle}>{i + 1}</span>
              <span className={styles.stepLabel}>{p.shortLabel}</span>
            </button>
          ))}
        </div>

        <button
          className={styles.navBtn}
          onClick={() => setActive((p) => Math.min(p + 1, phases.length - 1))}
          disabled={active === phases.length - 1}
          aria-label={labels.nextAria}
        >
          &rarr;
        </button>
      </div>

      <div
        id={`phase-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`phase-tab-${active}`}
        className={styles.panel}
      >
        <h3 className={styles.phaseTitle}>{phase.title}</h3>
        <p className={styles.phaseDesc}>{phase.description}</p>

        <div className={styles.columns}>
          <div className={styles.column}>
            <strong className={styles.columnTitle}>{labels.whereFits}</strong>
            <ul className={styles.list}>
              {phase.whereFits.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <strong className={styles.columnTitle}>{labels.whereBreaks}</strong>
            <ul className={styles.list}>
              {phase.whereBreaks.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {phase.nextFixes && (
          <div className={styles.nextTeaser}>
            <strong>{labels.nextFixes}</strong> {phase.nextFixes}
          </div>
        )}
      </div>
    </div>
  );
}
