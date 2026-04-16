import { useState, useCallback } from 'react';
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

export default function MaturityStepper() {
  const [active, setActive] = useState(0);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((prev) => Math.min(prev + 1, PHASES.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((prev) => Math.max(prev - 1, 0));
    }
  }, []);

  const phase = PHASES[active];

  return (
    <div className={styles.container}>
      <div className={styles.stepperRow}>
        <button
          className={styles.navBtn}
          onClick={() => setActive((p) => Math.max(p - 1, 0))}
          disabled={active === 0}
          aria-label="Fase anterior"
        >
          &larr;
        </button>

        <div
          className={styles.steps}
          role="tablist"
          aria-label="Fases de maturidade"
          onKeyDown={handleKeyDown}
        >
          {PHASES.map((p, i) => (
            <button
              key={i}
              id={`phase-tab-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-controls={`phase-panel-${i}`}
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
          onClick={() => setActive((p) => Math.min(p + 1, PHASES.length - 1))}
          disabled={active === PHASES.length - 1}
          aria-label="Proxima fase"
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
            <strong className={styles.columnTitle}>Onde funciona</strong>
            <ul className={styles.list}>
              {phase.whereFits.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <strong className={styles.columnTitle}>Onde quebra</strong>
            <ul className={styles.list}>
              {phase.whereBreaks.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {phase.nextFixes && (
          <div className={styles.nextTeaser}>
            <strong>O que a proxima fase resolve:</strong> {phase.nextFixes}
          </div>
        )}
      </div>
    </div>
  );
}
