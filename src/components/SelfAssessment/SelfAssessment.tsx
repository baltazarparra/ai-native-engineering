import { useState, useCallback } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';
import styles from './SelfAssessment.module.css';

interface Option {
  label: string;
  points: number;
}

interface Question {
  text: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    text: 'Como voce usa IA no trabalho hoje?',
    options: [
      { label: 'Raramente ou nunca uso', points: 0 },
      { label: 'Uso chat pra tirar duvidas e gerar snippets', points: 1 },
      { label: 'Uso agentes de codigo e tenho workflow definido', points: 2 },
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
];

interface Profile {
  name: string;
  description: string;
  suggestion: string;
  accent: string;
}

const PROFILES: Record<string, Profile> = {
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
};

function getProfile(score: number): string {
  if (score <= 4) return 'exploring';
  if (score <= 8) return 'operating';
  return 'structuring';
}

export default function SelfAssessment() {
  const [savedResult, setSavedResult] = useLocalStorage<string | null>(
    'ai-native-assessment-result',
    null,
  );
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(savedResult !== null);

  const handleSelect = useCallback((questionIndex: number, points: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: points }));
    if (questionIndex < QUESTIONS.length - 1) {
      setCurrent(questionIndex + 1);
    }
  }, []);

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
    const profile = PROFILES[savedResult];
    return (
      <div
        className={`${styles.resultCard} ${styles[`accent-${profile.accent}`]}`}
      >
        <h3 className={styles.resultTitle}>Seu perfil: {profile.name}</h3>
        <p className={styles.resultDesc}>{profile.description}</p>
        <div className={styles.resultSuggestion}>
          <strong>Proximo passo:</strong> {profile.suggestion}
        </div>
        <button className={styles.resetBtn} onClick={handleReset}>
          Refazer avaliacao
        </button>
      </div>
    );
  }

  const question = QUESTIONS[current];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        Pergunta {current + 1} de {QUESTIONS.length}
      </div>

      <div className={styles.stepDots}>
        {QUESTIONS.map((_, i) => (
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
          &larr; Anterior
        </button>

        {current < QUESTIONS.length - 1 ? (
          <button
            className={styles.navBtn}
            onClick={() => setCurrent((p) => p + 1)}
            disabled={answers[current] === undefined}
          >
            Proxima &rarr;
          </button>
        ) : (
          <button
            className={styles.finishBtn}
            onClick={handleFinish}
            disabled={!allAnswered}
          >
            Ver resultado
          </button>
        )}
      </div>
    </div>
  );
}
