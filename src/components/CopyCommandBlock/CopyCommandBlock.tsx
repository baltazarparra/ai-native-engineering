import { useState } from 'react';
import type { Lang } from '../../lib/i18n';
import styles from './CopyCommandBlock.module.css';

const LABELS = {
  'pt-BR': {
    ready: 'Comando pronto',
    copy: 'Copiar comando',
    copied: 'Copiado',
    error: 'Copie manualmente',
  },
  en: {
    ready: 'Command ready',
    copy: 'Copy command',
    copied: 'Copied',
    error: 'Copy manually',
  },
} as const;

interface Props {
  command: string;
  lang?: Lang;
  label?: string;
}

export default function CopyCommandBlock({
  command,
  lang = 'pt-BR',
  label,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const labels = LABELS[lang];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 2500);
    }
  }

  const buttonLabel =
    status === 'copied'
      ? labels.copied
      : status === 'error'
        ? labels.error
        : labels.copy;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.kicker}>{label || labels.ready}</span>
        <button className={styles.copyBtn} onClick={handleCopy} type="button">
          {buttonLabel}
        </button>
      </div>

      <pre className={styles.command}>
        <code>{command}</code>
      </pre>
    </div>
  );
}
