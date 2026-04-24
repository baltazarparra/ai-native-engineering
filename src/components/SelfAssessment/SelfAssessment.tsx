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
      text: 'Quando você precisa implementar algo com IA, qual fluxo parece mais próximo do seu?',
      options: [
        {
          label: 'Peço uma resposta no chat e copio o que parece funcionar',
          points: 0,
        },
        {
          label:
            'Uso IA para snippets ou dúvidas, mas implemento quase tudo manualmente',
          points: 1,
        },
        {
          label:
            'Delego tarefas bem descritas para agentes de código e reviso o resultado',
          points: 2,
        },
      ],
    },
    {
      text: 'Antes de pedir código a um agente, você...',
      options: [
        { label: 'Escrevo algo curto tipo "faz essa feature"', points: 0 },
        {
          label: 'Explico o objetivo, mas deixo vários detalhes implícitos',
          points: 1,
        },
        {
          label: 'Escrevo problema, comportamento esperado, contexto e limites',
          points: 2,
        },
      ],
    },
    {
      text: 'Quando o agente altera arquivos, você...',
      options: [
        { label: 'Aceito se a tela abriu ou o comando rodou', points: 0 },
        { label: 'Olho os arquivos principais e testo manualmente', points: 1 },
        {
          label:
            'Reviso o diff, rodo validações e comparo com os critérios de aceite',
          points: 2,
        },
      ],
    },
    {
      text: 'Como você dá contexto para o agente?',
      options: [
        { label: 'Quase não dou contexto', points: 0 },
        {
          label: 'Aponto alguns arquivos ou exemplos quando lembro',
          points: 1,
        },
        {
          label:
            'Indico padrões, arquivos relevantes, regras do projeto e casos que não podem quebrar',
          points: 2,
        },
      ],
    },
    {
      text: 'Quando o agente entrega algo que você não entende, você...',
      options: [
        { label: 'Confio se parece correto', points: 0 },
        {
          label: 'Peço uma explicação ou procuro entender por cima',
          points: 1,
        },
        {
          label: 'Entendo o conceito antes de aceitar o código',
          points: 2,
        },
      ],
    },
    {
      text: 'Quando o resultado do agente não é bom, você...',
      options: [
        { label: 'Desisto e faço manualmente', points: 0 },
        { label: 'Peço "faz de novo" com pequenas mudanças', points: 1 },
        {
          label: 'Analiso se faltou contexto, critério de aceite ou validação',
          points: 2,
        },
      ],
    },
  ],
  en: [
    {
      text: 'When you need to implement something with AI, which flow is closest to yours?',
      options: [
        {
          label: 'I ask chat for an answer and copy what seems to work',
          points: 0,
        },
        {
          label:
            'I use AI for snippets or questions, but implement almost everything manually',
          points: 1,
        },
        {
          label:
            'I delegate well-described tasks to coding agents and review the result',
          points: 2,
        },
      ],
    },
    {
      text: 'Before asking an agent for code, you...',
      options: [
        { label: 'Write something short like "build this feature"', points: 0 },
        {
          label: 'Explain the goal, but leave several details implicit',
          points: 1,
        },
        {
          label: 'Write the problem, expected behavior, context, and limits',
          points: 2,
        },
      ],
    },
    {
      text: 'When the agent changes files, you...',
      options: [
        {
          label: 'Accept it if the screen opened or the command ran',
          points: 0,
        },
        { label: 'Check the main files and test manually', points: 1 },
        {
          label:
            'Review the diff, run validations, and compare with acceptance criteria',
          points: 2,
        },
      ],
    },
    {
      text: 'How do you give context to the agent?',
      options: [
        { label: 'I give almost no context', points: 0 },
        {
          label: 'I point to a few files or examples when I remember',
          points: 1,
        },
        {
          label:
            'I point to patterns, relevant files, project rules, and cases that must not break',
          points: 2,
        },
      ],
    },
    {
      text: "When the agent delivers something you don't understand, you...",
      options: [
        { label: 'Trust it if it looks correct', points: 0 },
        {
          label: 'Ask for an explanation or try to understand it lightly',
          points: 1,
        },
        {
          label: 'Understand the concept before accepting the code',
          points: 2,
        },
      ],
    },
    {
      text: "When the agent's result isn't good, you...",
      options: [
        { label: 'Give up and do it manually', points: 0 },
        { label: 'Ask it to try again with small changes', points: 1 },
        {
          label:
            'Analyze whether context, acceptance criteria, or validation were missing',
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
        'Você está começando a transformar conversa em código e ainda está descobrindo onde agentes ajudam de verdade. Isso é normal. O importante agora é experimentar com intenção.',
      suggestion:
        'Comece pelo glossário (Sessão 1) pra entender agentes, contexto e prompts, e depois explore ferramentas e modelos (Sessão 2) pra ver o que combina com seu fluxo.',
      accent: 'yellow',
    },
    operating: {
      name: 'Operando',
      description:
        'Você já consegue delegar partes do trabalho para IA e percebe a diferença entre um pedido vago e um briefing útil. O próximo passo é dar mais estrutura ao processo.',
      suggestion:
        'Foque na Sessão 3 (Maturidade) pra entender onde você está, e depois na Sessão 4 (Como Operar) pra montar seus checklists e artefatos.',
      accent: 'blue',
    },
    structuring: {
      name: 'Estruturando',
      description:
        'Você já opera agentes com contexto, instruções, revisão de diff e validação. A IA não é uma aba extra: ela faz parte do seu sistema de entrega.',
      suggestion:
        'Revise a Sessão 3 pra calibrar sua visão do time. Use esse site como referência compartilhada pra alinhar todo mundo.',
      accent: 'green',
    },
  },
  en: {
    exploring: {
      name: 'Exploring',
      description:
        "You're starting to turn conversation into code and still figuring out where agents actually help. That's normal. The key right now is to experiment with intention.",
      suggestion:
        'Start with the glossary (Session 1) to understand agents, context, and prompts, then explore tools and models (Session 2) to see what fits your workflow.',
      accent: 'yellow',
    },
    operating: {
      name: 'Operating',
      description:
        'You already delegate parts of the work to AI and can tell the difference between a vague request and a useful brief. The next step is giving that process more structure.',
      suggestion:
        'Focus on Session 3 (Maturity) to understand where you stand, then Session 4 for checklists and practical artifacts.',
      accent: 'blue',
    },
    structuring: {
      name: 'Structuring',
      description:
        'You already operate agents with context, instructions, diff review, and validation. AI is not an extra tab: it is part of your delivery system.',
      suggestion:
        "Review Session 3 to calibrate your team's position. Use this site as a shared reference to align everyone.",
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

      <p key={`question-${current}`} className={styles.questionText}>
        {question.text}
      </p>

      <div key={`options-${current}`} className={styles.options}>
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
