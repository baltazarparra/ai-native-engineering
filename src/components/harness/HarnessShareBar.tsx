import { useEffect, useState } from 'react';
import type { Lang } from '../../lib/i18n';
import styles from './HarnessShareBar.module.css';

const LABELS = {
  'pt-BR': {
    copy: 'Copiar link',
    copied: 'Copiado',
    copyError: 'Copie manualmente',
    share: 'Compartilhar',
    shareError: 'Não foi possível compartilhar',
    aria: 'Compartilhar este capítulo',
  },
  en: {
    copy: 'Copy link',
    copied: 'Copied',
    copyError: 'Copy manually',
    share: 'Share',
    shareError: 'Could not share',
    aria: 'Share this chapter',
  },
} as const;

interface Props {
  url: string;
  title: string;
  lang?: Lang;
}

export default function HarnessShareBar({ url, title, lang = 'pt-BR' }: Props) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'error'>('idle');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const labels = LABELS[lang];

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('error');
      window.setTimeout(() => setCopyStatus('idle'), 2500);
    }
  }

  async function handleShare() {
    try {
      await navigator.share({ title, text: title, url });
      setShareStatus('idle');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareStatus('error');
      window.setTimeout(() => setShareStatus('idle'), 2500);
    }
  }

  const copyLabel =
    copyStatus === 'copied'
      ? labels.copied
      : copyStatus === 'error'
        ? labels.copyError
        : labels.copy;

  return (
    <div className={styles.bar} aria-label={labels.aria}>
      <button className={styles.btnPrimary} onClick={handleCopy} type="button">
        {copyLabel}
      </button>
      {canNativeShare ? (
        <button className={styles.btnSecondary} onClick={handleShare} type="button">
          {shareStatus === 'error' ? labels.shareError : labels.share}
        </button>
      ) : null}
    </div>
  );
}
