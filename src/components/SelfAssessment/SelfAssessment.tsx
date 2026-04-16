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
      text: 'Como você usa IA no trabalho hoje?',
      options: [
        { label: 'Raramente ou nunca uso', points: 0 },
        { label: 'Uso chat pra tirar dúvidas e gerar snippets', points: 1 },
        {
          label: 'Uso agentes de código e tenho workflow definido',
          points: 2,
        },
      ],
    },
    {
      text: 'Antes de pedir algo pra IA, você...',
      options: [
        { label: 'Digito o que vem na cabeça', points: 0 },
        { label: 'Penso no que quero mas não estruturo muito', points: 1 },
        { label: 'Escrevo objetivo, contexto e restrições antes', points: 2 },
      ],
    },
    {
      text: 'Quando a IA gera código, você...',
      options: [
        { label: 'Aceito se parece correto', points: 0 },
        { label: 'Leio por cima e testo manualmente', points: 1 },
        { label: 'Reviso, rodo testes e valido contra a spec', points: 2 },
      ],
    },
    {
      text: 'Seu projeto tem regras ou instruções pra IA (rules files, CLAUDE.md)?',
      options: [
        { label: 'Não sei o que é isso', points: 0 },
        { label: 'Já ouvi falar mas não uso', points: 1 },
        { label: 'Sim, e atualizo conforme o projeto evolui', points: 2 },
      ],
    },
    {
      text: 'Como você escolhe qual modelo ou ferramenta usar pra uma tarefa?',
      options: [
        { label: 'Uso sempre o mesmo (ChatGPT, Copilot, etc.)', points: 0 },
        { label: 'Tenho preferências mas não penso muito nisso', points: 1 },
        {
          label: 'Escolho modelo e ferramenta pela complexidade da tarefa',
          points: 2,
        },
      ],
    },
    {
      text: 'Quando o resultado da IA não é bom, você...',
      options: [
        { label: 'Desisto e faço manualmente', points: 0 },
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
        { label: 'Think about the goal but don\'t structure much', points: 1 },
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
        { label: 'I don\'t know what that is', points: 0 },
        { label: 'I\'ve heard of it but don\'t use it', points: 1 },
        { label: 'Yes, and we update it as the project evolves', points: 2 },
      ],
    },
    {
      text: 'How do you choose a model or tool for a task?',
      options: [
        { label: 'I always use the same one', points: 0 },
        {
          label: 'I have preferences but don\'t think much about it',
          points: 1,
        },
        {
          label: 'I choose model and tool based on task complexity',
          points: 2,
        },
      ],
    },
    {
      text: 'When the AI result isn\'t good, you...',
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
        'Você está começando a usar IA no trabalho e ainda está descobrindo o que funciona e o que não funciona. Isso é normal — o importante agora é experimentar com intenção.',
      suggestion:
        'Comece pelo glossário (Sessão 1) pra entender os termos, e depois explore as ferramentas (Sessão 2) pra ver o que combina com seu fluxo.',
      accent: 'yellow',
    },
    operating: {
      name: 'Operando',
      description:
        'Você já tem um fluxo de trabalho com IA e consegue perceber a diferença entre um prompt bem feito e um que não funciona. O próximo passo é dar estrutura a isso.',
      suggestion:
        'Foque na Sessão 4 (Maturidade) pra entender onde você está, e depois na Sessão 5 (Como Operar) pra montar seus checklists e artefatos.',
      accent: 'blue',
    },
    structuring: {
      name: 'Estruturando',
      description:
        'Você já constrói sistemas onde a IA opera de forma estruturada — com rules files, validação automática e escolha de modelo por tarefa. Você já é AI-native.',
      suggestion:
        'Revise a Sessão 4 pra calibrar sua visão do time. Use esse site como referência compartilhada pra alinhar todo mundo.',
      accent: 'green',
    },
  },
  en: {
    exploring: {
      name: 'Exploring',
      description:
        'You\'re starting to bring AI into your work and still figuring out what helps and what doesn\'t. That\'s normal — the key right now is to experiment with intention.',
      suggestion:
        'Start with the glossary (Session 1) to get the vocabulary down, then explore tools (Session 2) to see what fits your workflow.',
      accent: 'yellow',
    },
    operating: {
      name: 'Operating',
      description:
        'You already have an AI workflow and can tell the difference between a useful prompt and a vague one. The next step is giving that workflow some structure.',
      suggestion:
        'Focus on Session 4 (Maturity) to understand where you stand, then Session 5 for checklists and practical artifacts.',
      accent: 'blue',
    },
    structuring: {
      name: 'Structuring',
      description:
        'You build systems where AI operates in a structured way — with rules files, automated validation, and model selection by task. You\'re already AI-native.',
      suggestion:
        'Review Session 4 to calibrate your team\'s position. Use this site as a shared reference to align everyone.',
      accent: 'green',
    },
  },
};

const LABELS = {
  'pt-BR': {
    profilePrefix: 'Seu perfil:',
    nextStep: 'Próximo passo:',
    reset: 'Refazer avaliação',
    questionProgress: (current: number, total: number) =>
      `Pergunta ${current} de ${total}`,
    previous: '\u2190 Anterior',
    next: 'Próxima \u2192',
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
