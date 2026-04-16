import { useState, useCallback } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import type { Lang } from '../../lib/i18n';
import styles from './SelfAssessment.module.css';

interface Option {
  label: string;
  points: number;
}

interface Question {
  text: string;
  options: Option[];
}

const QUESTIONS_BY_LANG: Record<Lang, Question[]> = {
  'pt-BR': [
    {
      text: 'Como voce usa IA no trabalho hoje?',
      options: [
        { label: 'Raramente ou nunca uso', points: 0 },
        { label: 'Uso chat pra tirar duvidas e gerar snippets', points: 1 },
        {
          label: 'Uso agentes de codigo e tenho workflow definido',
          points: 2,
        },
      ],
    },
    {
      text: 'Antes de pedir algo pra IA, voce...',
      options: [
        { label: 'Digito o que vem na cabeca', points: 0 },
        { label: 'Penso no que quero mas nao estruturo muito', points: 1 },
        { label: 'Escrevo objetivo, contexto e restricoes antes', points: 2 },
      ],
    },
    {
      text: 'Quando a IA gera codigo, voce...',
      options: [
        { label: 'Aceito se parece correto', points: 0 },
        { label: 'Leio por cima e testo manualmente', points: 1 },
        { label: 'Reviso, rodo testes e valido contra a spec', points: 2 },
      ],
    },
    {
      text: 'Seu projeto tem regras ou instrucoes pra IA (rules files, CLAUDE.md)?',
      options: [
        { label: 'Nao sei o que e isso', points: 0 },
        { label: 'Ja ouvi falar mas nao uso', points: 1 },
        { label: 'Sim, e atualizo conforme o projeto evolui', points: 2 },
      ],
    },
    {
      text: 'Como voce escolhe qual modelo ou ferramenta usar pra uma tarefa?',
      options: [
        { label: 'Uso sempre o mesmo (ChatGPT, Copilot, etc.)', points: 0 },
        { label: 'Tenho preferencias mas nao penso muito nisso', points: 1 },
        {
          label: 'Escolho modelo e ferramenta pela complexidade da tarefa',
          points: 2,
        },
      ],
    },
    {
      text: 'Quando o resultado da IA nao e bom, voce...',
      options: [
        { label: 'Desisto e faco manualmente', points: 0 },
        { label: 'Tento reformular o prompt', points: 1 },
        {
          label: 'Analiso por que falhou e ajusto contexto, spec ou ferramenta',
          points: 2,
        },
      ],
    },
  ],
  en: [
    {
      text: 'How do you use AI at work today?',
      options: [
        { label: 'Rarely or never', points: 0 },
        { label: 'I use chat for questions and snippets', points: 1 },
        { label: 'I use coding agents and have a defined workflow', points: 2 },
      ],
    },
    {
      text: 'Before asking AI for something, you...',
      options: [
        { label: 'Type whatever comes to mind', points: 0 },
        { label: 'Think about the goal but do not structure much', points: 1 },
        { label: 'Write goal, context, and constraints first', points: 2 },
      ],
    },
    {
      text: 'When AI generates code, you...',
      options: [
        { label: 'Accept it if it looks right', points: 0 },
        { label: 'Skim it and test manually', points: 1 },
        {
          label: 'Review it, run tests, and validate against the spec',
          points: 2,
        },
      ],
    },
    {
      text: 'Does your project have AI rules or instructions (rules files, CLAUDE.md)?',
      options: [
        { label: 'I do not know what that is', points: 0 },
        { label: 'I have heard of it but do not use it', points: 1 },
        { label: 'Yes, and we update it as the project evolves', points: 2 },
      ],
    },
    {
      text: 'How do you choose a model or tool for a task?',
      options: [
        { label: 'I always use the same one', points: 0 },
        {
          label: 'I have preferences but do not think much about it',
          points: 1,
        },
        {
          label: 'I choose model and tool based on task complexity',
          points: 2,
        },
      ],
    },
    {
      text: 'When the AI result is not good, you...',
      options: [
        { label: 'Give up and do it manually', points: 0 },
        { label: 'Try to rewrite the prompt', points: 1 },
        {
          label: 'Analyze why it failed and adjust context, spec, or tool',
          points: 2,
        },
      ],
    },
  ],
};

interface Profile {
  name: string;
  description: string;
  suggestion: string;
  accent: string;
}

const PROFILES_BY_LANG: Record<Lang, Record<string, Profile>> = {
  'pt-BR': {
    exploring: {
      name: 'Explorando',
      description:
        'Voce esta comecando a integrar IA no trabalho. O foco agora e experimentar, entender o que funciona e o que nao funciona. Nao tem nada de errado nisso.',
      suggestion:
        'Comece pelo glossario (Sessao 1) pra alinhar vocabulario, depois explore as ferramentas (Sessao 2) pra encontrar a que reduz mais friccao no seu workflow.',
      accent: 'yellow',
    },
    operating: {
      name: 'Operando',
      description:
        'Voce ja tem um workflow com IA. Usa ferramentas com alguma regularidade e sabe a diferenca entre pedir bem e pedir mal. O proximo passo e estruturar.',
      suggestion:
        'Foque na Sessao 4 (Maturidade) pra entender em que fase voce opera. Depois, a Sessao 5 (Como Operar) vai te dar checklists e artefatos pra padronizar.',
      accent: 'blue',
    },
    structuring: {
      name: 'Estruturando',
      description:
        'Voce nao so usa IA, voce constroi sistemas pra IA operar. Rules files, validacao automatica, escolha de modelo por tarefa. Voce ja e AI-native.',
      suggestion:
        'Revise a Sessao 4 (Maturidade) pra calibrar. Voce provavelmente ja opera entre Fase 4 e 5. Use esse site como referencia pra alinhar o time.',
      accent: 'green',
    },
  },
  en: {
    exploring: {
      name: 'Exploring',
      description:
        'You are starting to bring AI into your work. The focus now is experimenting, noticing what helps, and noticing what gets in the way. Totally normal place to be.',
      suggestion:
        'Start with the glossary (Session 1), then explore tools (Session 2) to find what removes friction from your workflow.',
      accent: 'yellow',
    },
    operating: {
      name: 'Operating',
      description:
        'You already have an AI workflow. You use tools regularly and know the difference between a vague ask and a useful ask. The next step is structure.',
      suggestion:
        'Focus on Session 4 (Maturity) to understand which phase you operate in. Then Session 5 gives you checklists and artifacts to standardize.',
      accent: 'blue',
    },
    structuring: {
      name: 'Structuring',
      description:
        'You do not just use AI. You build systems where AI can operate: rules files, automated validation, model choice by task. You are already AI-native.',
      suggestion:
        'Review Session 4 to calibrate. You probably operate between Phase 4 and 5. Use this site as a shared reference for the team.',
      accent: 'green',
    },
  },
};

const LABELS = {
  'pt-BR': {
    profilePrefix: 'Seu perfil:',
    nextStep: 'Proximo passo:',
    reset: 'Refazer avaliacao',
    questionProgress: (current: number, total: number) =>
      `Pergunta ${current} de ${total}`,
    previous: '\u2190 Anterior',
    next: 'Proxima \u2192',
    finish: 'Ver resultado',
  },
  en: {
    profilePrefix: 'Your profile:',
    nextStep: 'Next step:',
    reset: 'Retake assessment',
    questionProgress: (current: number, total: number) =>
      `Question ${current} of ${total}`,
    previous: '\u2190 Previous',
    next: 'Next \u2192',
    finish: 'See result',
  },
} as const;

function getProfile(score: number): string {
  if (score <= 4) return 'exploring';
  if (score <= 8) return 'operating';
  return 'structuring';
}

interface Props {
  lang?: Lang;
}

export default function SelfAssessment({ lang = 'pt-BR' }: Props) {
  const [savedResult, setSavedResult] = useLocalStorage<string | null>(
    'ai-native-assessment-result',
    null,
  );
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(savedResult !== null);
  const questions = QUESTIONS_BY_LANG[lang];
  const profiles = PROFILES_BY_LANG[lang];
  const labels = LABELS[lang];

  const handleSelect = useCallback(
    (questionIndex: number, points: number) => {
      setAnswers((prev) => ({ ...prev, [questionIndex]: points }));
      if (questionIndex < questions.length - 1) {
        setCurrent(questionIndex + 1);
      }
    },
    [questions.length],
  );

  const handleFinish = useCallback(() => {
    const score = Object.values(answers).reduce((sum, p) => sum + p, 0);
    const profileKey = getProfile(score);
    setSavedResult(profileKey);
    setShowResult(true);
  }, [answers, setSavedResult]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setCurrent(0);
    setShowResult(false);
    setSavedResult(null);
  }, [setSavedResult]);

  if (showResult && savedResult) {
    const profile = profiles[savedResult];
    return (
      <div
        className={`${styles.resultCard} ${styles[`accent-${profile.accent}`]}`}
      >
        <h3 className={styles.resultTitle}>
          {labels.profilePrefix} {profile.name}
        </h3>
        <p className={styles.resultDesc}>{profile.description}</p>
        <div className={styles.resultSuggestion}>
          <strong>{labels.nextStep}</strong> {profile.suggestion}
        </div>
        <button className={styles.resetBtn} onClick={handleReset}>
          {labels.reset}
        </button>
      </div>
    );
  }

  const question = questions[current];
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        {labels.questionProgress(current + 1, questions.length)}
      </div>

      <div className={styles.stepDots}>
        {questions.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''} ${answers[i] !== undefined ? styles.dotAnswered : ''}`}
          />
        ))}
      </div>

      <p className={styles.questionText}>{question.text}</p>

      <div className={styles.options}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`${styles.optionBtn} ${answers[current] === opt.points ? styles.optionSelected : ''}`}
            onClick={() => handleSelect(current, opt.points)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
          disabled={current === 0}
        >
          {labels.previous}
        </button>

        {current < questions.length - 1 ? (
          <button
            className={styles.navBtn}
            onClick={() => setCurrent((p) => p + 1)}
            disabled={answers[current] === undefined}
          >
            {labels.next}
          </button>
        ) : (
          <button
            className={styles.finishBtn}
            onClick={handleFinish}
            disabled={!allAnswered}
          >
            {labels.finish}
          </button>
        )}
      </div>
    </div>
  );
}
