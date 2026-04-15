export interface SessionCardData {
  title: string;
  slug: string;
  order: number;
  summary: string;
  readingTime: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  heroLabel: string;
  accent: 'yellow' | 'blue' | 'green' | 'coral';
}

export const sessions: SessionCardData[] = [
  {
    title: 'O que e um AI-Native Engineer',
    slug: 'ai-native-engineer',
    order: 0,
    summary:
      'O ponto de partida. O que muda quando IA vira parte do fluxo de trabalho e nao so uma ferramenta auxiliar.',
    readingTime: 12,
    level: 'beginner',
    heroLabel: 'Ponto de partida',
    accent: 'yellow',
  },
  {
    title: 'Novas terminologias populares',
    slug: 'glossario',
    order: 1,
    summary:
      'Prompt, token, contexto, alucinacao, RAG, fine-tuning. O glossario que organiza o vocabulario sem jargao desnecessario.',
    readingTime: 15,
    level: 'beginner',
    heroLabel: 'Vocabulario essencial',
    accent: 'blue',
  },
  {
    title: 'Ferramentas: IDEs vs CLI',
    slug: 'ferramentas',
    order: 2,
    summary:
      'Cursor, Windsurf, GitHub Copilot, Claude Code. O que cada ferramenta faz, onde brilha e onde tropeça.',
    readingTime: 18,
    level: 'beginner',
    heroLabel: 'Mapa de ferramentas',
    accent: 'green',
  },
  {
    title: 'LLMs e os modelos mais usados',
    slug: 'modelos',
    order: 3,
    summary:
      'GPT, Claude, Gemini, Llama. Como funcionam por cima, o que diferencia um do outro e como escolher.',
    readingTime: 20,
    level: 'intermediate',
    heroLabel: 'Entendendo modelos',
    accent: 'coral',
  },
  {
    title: 'A evolucao do desenvolvimento com IA',
    slug: 'maturidade',
    order: 4,
    summary:
      'De copiar resposta do ChatGPT ate orquestrar agentes. As 5 fases de maturidade e onde voce esta.',
    readingTime: 22,
    level: 'intermediate',
    heroLabel: 'Niveis de maturidade',
    accent: 'yellow',
  },
  {
    title: 'Como operar de forma AI-native na pratica',
    slug: 'como-operar',
    order: 5,
    summary:
      'Workflows reais, exemplos de projetos e o que muda no dia a dia quando voce opera como AI-native.',
    readingTime: 25,
    level: 'advanced',
    heroLabel: 'Na pratica',
    accent: 'blue',
  },
];
