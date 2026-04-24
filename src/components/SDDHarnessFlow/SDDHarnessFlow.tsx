import { useCallback, useState } from 'react';
import type { Lang } from '../../lib/i18n';
import styles from './SDDHarnessFlow.module.css';

interface FlowStage {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  specRole: string;
  harnessRole: string;
  artifacts: string[];
  enterpriseSignal: string;
}

const STAGES_BY_LANG: Record<Lang, FlowStage[]> = {
  'pt-BR': [
    {
      id: 'spec',
      title: 'Contrato de intenção',
      eyebrow: 'SDD',
      description:
        'Antes de pedir código, o time transforma intenção de negócio em uma spec clara: problema, escopo, restrições, critérios de aceite e riscos.',
      specRole:
        'Define o que precisa ser verdade para a entrega ser considerada correta.',
      harnessRole:
        'Fornece templates, exemplos e regras para que a spec nasça no formato certo.',
      artifacts: ['PRD leve', 'critérios de aceite', 'não-objetivos'],
      enterpriseSignal:
        'Produto, engenharia e QA conseguem discutir o mesmo contrato antes da implementação.',
    },
    {
      id: 'context',
      title: 'Pacote de contexto',
      eyebrow: 'Harness',
      description:
        'O agente recebe o mapa do repositório, convenções, docs, exemplos e limites. Contexto não fica perdido em Slack ou na cabeça de alguém.',
      specRole:
        'Diz quais áreas do sistema importam e quais decisões não devem ser reabertas.',
      harnessRole:
        'Organiza AGENTS.md, docs, rules files e referências versionadas.',
      artifacts: ['AGENTS.md', 'docs de arquitetura', 'rules files'],
      enterpriseSignal:
        'Um novo humano ou agente consegue entrar no projeto sem reinventar o processo.',
    },
    {
      id: 'execution',
      title: 'Execução controlada',
      eyebrow: 'Agente',
      description:
        'A tarefa vira passos pequenos. O agente implementa dentro de permissões, ferramentas e limites conhecidos, não em modo “faz tudo”.',
      specRole:
        'Quebra a entrega em comportamento esperado, interfaces e decisões verificáveis.',
      harnessRole:
        'Define ferramentas disponíveis, escopo de edição, comandos e permissões.',
      artifacts: ['plano de execução', 'diff pequeno', 'log de decisões'],
      enterpriseSignal:
        'O trabalho fica rastreável e revisável, mesmo quando o agente executa rápido.',
    },
    {
      id: 'validation',
      title: 'Gates de validação',
      eyebrow: 'Qualidade',
      description:
        'O output não é aceito porque parece bom. Ele passa por lint, typecheck, testes, build, segurança e critérios específicos da spec.',
      specRole: 'Fornece os critérios que a validação precisa comprovar.',
      harnessRole:
        'Automatiza checks e transforma falhas em feedback acionável para o agente.',
      artifacts: ['testes', 'CI', 'checklist de aceite'],
      enterpriseSignal:
        'A revisão humana começa depois das verificações básicas, não no lugar delas.',
    },
    {
      id: 'governance',
      title: 'Governança e review',
      eyebrow: 'Entrega',
      description:
        'Mudanças passam por PR, ownership, auditoria e aprovação proporcional ao risco. Autonomia aumenta onde o sistema consegue provar segurança.',
      specRole: 'Explicita risco, impacto, rollback e quem precisa aprovar.',
      harnessRole:
        'Mantém trilha de auditoria, políticas de permissão e padrões de review.',
      artifacts: ['PR', 'review', 'rollback plan'],
      enterpriseSignal:
        'O fluxo aguenta compliance, segurança e operação sem virar teatro burocrático.',
    },
    {
      id: 'learning',
      title: 'Aprendizado do sistema',
      eyebrow: 'Loop',
      description:
        'Quando algo falha, o time não só corrige o código. Ele melhora a spec, adiciona teste, atualiza regra ou muda o harness.',
      specRole:
        'Evolui junto com o produto para evitar drift entre intenção e realidade.',
      harnessRole:
        'Codifica aprendizados em docs, comandos, hooks, linters e templates.',
      artifacts: ['postmortem leve', 'novo teste', 'regra atualizada'],
      enterpriseSignal:
        'A organização fica melhor a cada entrega, em vez de depender de memória informal.',
    },
  ],
  en: [
    {
      id: 'spec',
      title: 'Intent contract',
      eyebrow: 'SDD',
      description:
        'Before asking for code, the team turns business intent into a clear spec: problem, scope, constraints, acceptance criteria, and risks.',
      specRole: 'Defines what must be true for the work to count as correct.',
      harnessRole:
        'Provides templates, examples, and rules so the spec starts in the right shape.',
      artifacts: ['light PRD', 'acceptance criteria', 'non-goals'],
      enterpriseSignal:
        'Product, engineering, and QA can discuss the same contract before implementation.',
    },
    {
      id: 'context',
      title: 'Context package',
      eyebrow: 'Harness',
      description:
        'The agent receives the repository map, conventions, docs, examples, and boundaries. Context does not live only in chat or someone’s head.',
      specRole:
        'Says which areas matter and which decisions should not be reopened.',
      harnessRole:
        'Organizes AGENTS.md, architecture docs, rules files, and versioned references.',
      artifacts: ['AGENTS.md', 'architecture docs', 'rules files'],
      enterpriseSignal:
        'A new human or agent can enter the project without reinventing the process.',
    },
    {
      id: 'execution',
      title: 'Controlled execution',
      eyebrow: 'Agent',
      description:
        'The task becomes small steps. The agent implements within known permissions, tools, and boundaries, not in “do everything” mode.',
      specRole:
        'Breaks the delivery into expected behavior, interfaces, and verifiable decisions.',
      harnessRole:
        'Defines available tools, edit scope, commands, and permissions.',
      artifacts: ['execution plan', 'small diff', 'decision log'],
      enterpriseSignal:
        'Work stays traceable and reviewable, even when the agent moves quickly.',
    },
    {
      id: 'validation',
      title: 'Validation gates',
      eyebrow: 'Quality',
      description:
        'Output is not accepted because it looks good. It passes lint, typecheck, tests, build, security checks, and spec-specific criteria.',
      specRole: 'Provides the criteria validation must prove.',
      harnessRole:
        'Automates checks and turns failures into actionable feedback for the agent.',
      artifacts: ['tests', 'CI', 'acceptance checklist'],
      enterpriseSignal:
        'Human review starts after basic verification, not instead of it.',
    },
    {
      id: 'governance',
      title: 'Governance and review',
      eyebrow: 'Delivery',
      description:
        'Changes move through PRs, ownership, audit trails, and risk-appropriate approval. Autonomy increases where the system can prove safety.',
      specRole:
        'Makes risk, impact, rollback, and approval ownership explicit.',
      harnessRole:
        'Maintains audit trails, permission policies, and review standards.',
      artifacts: ['PR', 'review', 'rollback plan'],
      enterpriseSignal:
        'The workflow can support compliance, security, and operations without becoming theater.',
    },
    {
      id: 'learning',
      title: 'System learning',
      eyebrow: 'Loop',
      description:
        'When something fails, the team does not only fix the code. It improves the spec, adds a test, updates a rule, or changes the harness.',
      specRole:
        'Evolves with the product to avoid drift between intent and reality.',
      harnessRole:
        'Codifies learnings into docs, commands, hooks, linters, and templates.',
      artifacts: ['light postmortem', 'new test', 'updated rule'],
      enterpriseSignal:
        'The organization gets better with each delivery instead of relying on informal memory.',
    },
  ],
};

const LABELS = {
  'pt-BR': {
    aria: 'Fluxo SDD e Harness Design',
    spec: 'Papel do SDD',
    harness: 'Papel do harness',
    artifacts: 'Artefatos',
    signal: 'Sinal corporativo',
  },
  en: {
    aria: 'SDD and Harness Design flow',
    spec: 'SDD role',
    harness: 'Harness role',
    artifacts: 'Artifacts',
    signal: 'Enterprise signal',
  },
} as const;

interface Props {
  lang?: Lang;
}

export default function SDDHarnessFlow({ lang = 'pt-BR' }: Props) {
  const stages = STAGES_BY_LANG[lang];
  const labels = LABELS[lang];
  const [active, setActive] = useState(0);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        setActive((current) => Math.min(current + 1, stages.length - 1));
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setActive((current) => Math.max(current - 1, 0));
      }
    },
    [stages.length],
  );

  const stage = stages[active];

  return (
    <section className={styles.container} aria-label={labels.aria}>
      <div
        className={styles.rail}
        role="tablist"
        aria-label={labels.aria}
        onKeyDown={handleKeyDown}
      >
        {stages.map((item, index) => (
          <button
            key={item.id}
            className={`${styles.stageButton} ${
              active === index ? styles.stageButtonActive : ''
            }`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`sdd-harness-panel-${item.id}`}
            id={`sdd-harness-tab-${item.id}`}
            onClick={() => setActive(index)}
          >
            <span className={styles.stageIndex}>{index + 1}</span>
            <span className={styles.stageEyebrow}>{item.eyebrow}</span>
            <span className={styles.stageTitle}>{item.title}</span>
          </button>
        ))}
      </div>

      <article
        className={styles.panel}
        role="tabpanel"
        id={`sdd-harness-panel-${stage.id}`}
        aria-labelledby={`sdd-harness-tab-${stage.id}`}
      >
        <div className={styles.panelHeader}>
          <span className={styles.panelEyebrow}>{stage.eyebrow}</span>
          <h3>{stage.title}</h3>
          <p>{stage.description}</p>
        </div>

        <div className={styles.detailGrid}>
          <div className={styles.detailCard}>
            <h4>{labels.spec}</h4>
            <p>{stage.specRole}</p>
          </div>
          <div className={styles.detailCard}>
            <h4>{labels.harness}</h4>
            <p>{stage.harnessRole}</p>
          </div>
          <div className={styles.detailCard}>
            <h4>{labels.artifacts}</h4>
            <ul>
              {stage.artifacts.map((artifact) => (
                <li key={artifact}>{artifact}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.signal}>
          <strong>{labels.signal}:</strong> {stage.enterpriseSignal}
        </div>
      </article>
    </section>
  );
}
