import { useState, useEffect, useCallback } from 'react';
import type { Lang } from '../../lib/i18n';
import styles from './HackerNewsNewspaper.module.css';

interface HNStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
}

interface Props {
  lang?: Lang;
}

const LABELS = {
  'pt-BR': {
    masthead: 'Hacker News — Top Histórias',
    loading: 'Carregando histórias…',
    error: 'Não foi possível carregar as histórias.',
    retry: 'Tentar novamente',
    points: 'pts',
    comments: 'comentários',
    by: 'por',
    ago: 'atrás',
    justNow: 'agora',
  },
  en: {
    masthead: 'Hacker News — Top Stories',
    loading: 'Loading stories…',
    error: 'Could not load stories.',
    retry: 'Try again',
    points: 'pts',
    comments: 'comments',
    by: 'by',
    ago: 'ago',
    justNow: 'just now',
  },
} as const;

function timeAgo(unix: number, lang: Lang): string {
  const h = Math.floor((Date.now() - unix * 1000) / 3_600_000);
  const labels = LABELS[lang];
  if (h < 1) return labels.justNow;
  if (h < 24) return `${h}h ${labels.ago}`;
  return `${Math.floor(h / 24)}d ${labels.ago}`;
}

function storyHref(story: HNStory): string {
  return story.url ?? `https://news.ycombinator.com/item?id=${story.id}`;
}

export default function HackerNewsNewspaper({ lang = 'pt-BR' }: Props) {
  const [stories, setStories] = useState<HNStory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const labels = LABELS[lang];

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const idsRes = await fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json',
      );
      if (!idsRes.ok) throw new Error('Failed to fetch IDs');
      const allIds: number[] = await idsRes.json();
      const top10 = allIds.slice(0, 10);

      const fetched = await Promise.all(
        top10.map(async (id) => {
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          );
          if (!res.ok) throw new Error(`Failed to fetch item ${id}`);
          return res.json() as Promise<HNStory>;
        }),
      );

      setStories(fetched);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (loading) {
    return (
      <div className={styles.newspaper} aria-busy="true" aria-live="polite">
        <div className={styles.masthead}>{labels.masthead}</div>
        <div className={styles.skeletonBlock} aria-label={labels.loading} />
        <div className={styles.skeletonGrid}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
        <div className={styles.skeletonList}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !stories) {
    return (
      <div className={styles.newspaper}>
        <div className={styles.masthead}>{labels.masthead}</div>
        <div className={styles.errorState}>
          <p>{labels.error}</p>
          <button
            className={styles.retryBtn}
            onClick={fetchStories}
            type="button"
          >
            {labels.retry}
          </button>
        </div>
      </div>
    );
  }

  const [manchete, ...rest] = stories;
  const materias = rest.slice(0, 3);
  const listagem = rest.slice(3);

  return (
    <div className={styles.newspaper}>
      <div className={styles.masthead}>{labels.masthead}</div>

      {/* Manchete — top story */}
      <article className={styles.manchete}>
        <h2 className={styles.mancheteTitle}>
          <a
            href={storyHref(manchete)}
            className={styles.storyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {manchete.title}
          </a>
        </h2>
        <div className={styles.storyMeta}>
          <span>▲ {manchete.score} {labels.points}</span>
          <span>{labels.by} {manchete.by}</span>
          <span>{manchete.descendants ?? 0} {labels.comments}</span>
          <span>{timeAgo(manchete.time, lang)}</span>
        </div>
      </article>

      {/* Matérias — stories 2–4 */}
      <div className={styles.materias}>
        {materias.map((story) => (
          <article key={story.id} className={styles.materiaCard}>
            <h3 className={styles.materiaTitle}>
              <a
                href={storyHref(story)}
                className={styles.storyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {story.title}
              </a>
            </h3>
            <div className={styles.storyMeta}>
              <span>▲ {story.score} {labels.points}</span>
              <span>{story.descendants ?? 0} {labels.comments}</span>
              <span>{timeAgo(story.time, lang)}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Listagem — stories 5–10 */}
      <ol className={styles.listagem}>
        {listagem.map((story, i) => (
          <li key={story.id} className={styles.listaItem}>
            <span className={styles.listaNum}>{i + 5}</span>
            <div className={styles.listaContent}>
              <a
                href={storyHref(story)}
                className={styles.storyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {story.title}
              </a>
              <div className={styles.storyMeta}>
                <span>▲ {story.score}</span>
                <span>{story.descendants ?? 0} {labels.comments}</span>
                <span>{timeAgo(story.time, lang)}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
