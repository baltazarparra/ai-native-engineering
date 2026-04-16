import { useState, useMemo, useCallback } from 'react';
import {
  profilesByLang,
  tasksByLang,
  getChecklist,
} from '../../data/checklists';
import type { Lang } from '../../lib/i18n';
import styles from './ChecklistGenerator.module.css';

const LABELS = {
  'pt-BR': {
    profileStep: '1. Qual é seu perfil?',
    profileAria: 'Perfil',
    taskStep: '2. Que tipo de tarefa?',
    taskAria: 'Tipo de tarefa',
    before: 'Antes de pedir',
    after: 'Antes de aceitar',
    copy: 'Copiar checklist',
    copyBefore: 'ANTES DE PEDIR:',
    copyAfter: 'ANTES DE ACEITAR:',
  },
  en: {
    profileStep: '1. What is your profile?',
    profileAria: 'Profile',
    taskStep: '2. What kind of task?',
    taskAria: 'Task type',
    before: 'Before asking',
    after: 'Before accepting',
    copy: 'Copy checklist',
    copyBefore: 'BEFORE ASKING:',
    copyAfter: 'BEFORE ACCEPTING:',
  },
} as const;

interface Props {
  lang?: Lang;
}

export default function ChecklistGenerator({ lang = 'pt-BR' }: Props) {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const labels = LABELS[lang];
  const profiles = profilesByLang[lang];
  const tasks = tasksByLang[lang];

  const checklist = useMemo(() => {
    if (!selectedProfile || !selectedTask) return [];
    return getChecklist(selectedProfile, selectedTask, lang);
  }, [selectedProfile, selectedTask, lang]);

  const beforeItems = useMemo(
    () => checklist.filter((i) => i.category === 'antes-de-pedir'),
    [checklist],
  );
  const afterItems = useMemo(
    () => checklist.filter((i) => i.category === 'antes-de-aceitar'),
    [checklist],
  );

  const handleProfileSelect = useCallback((id: string) => {
    setSelectedProfile(id);
    setSelectedTask(null);
    setChecked(new Set());
  }, []);

  const handleTaskSelect = useCallback((id: string) => {
    setSelectedTask(id);
    setChecked(new Set());
  }, []);

  const toggleCheck = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleCopy = useCallback(async () => {
    const lines: string[] = [];
    lines.push(labels.copyBefore);
    beforeItems.forEach((item) => {
      lines.push(`${checked.has(item.id) ? '[x]' : '[ ]'} ${item.text}`);
    });
    lines.push('');
    lines.push(labels.copyAfter);
    afterItems.forEach((item) => {
      lines.push(`${checked.has(item.id) ? '[x]' : '[ ]'} ${item.text}`);
    });

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {
      // clipboard unavailable
    }
  }, [beforeItems, afterItems, checked, labels]);

  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <span className={styles.stepLabel}>{labels.profileStep}</span>
        <div
          className={styles.buttons}
          role="group"
          aria-label={labels.profileAria}
        >
          {profiles.map((p) => (
            <button
              key={p.id}
              className={`${styles.selectBtn} ${selectedProfile === p.id ? styles.selectActive : ''}`}
              onClick={() => handleProfileSelect(p.id)}
              aria-pressed={selectedProfile === p.id}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {selectedProfile && (
        <div className={styles.step}>
          <span className={styles.stepLabel}>{labels.taskStep}</span>
          <div
            className={styles.buttons}
            role="group"
            aria-label={labels.taskAria}
          >
            {tasks.map((t) => (
              <button
                key={t.id}
                className={`${styles.selectBtn} ${selectedTask === t.id ? styles.selectActive : ''}`}
                onClick={() => handleTaskSelect(t.id)}
                aria-pressed={selectedTask === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {checklist.length > 0 && (
        <div className={styles.checklistCard}>
          <div className={styles.checklistSection}>
            <h4 className={styles.sectionTitle}>{labels.before}</h4>
            {beforeItems.map((item) => (
              <label key={item.id} className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={checked.has(item.id)}
                  onChange={() => toggleCheck(item.id)}
                  className={styles.checkbox}
                />
                <span
                  className={checked.has(item.id) ? styles.checkedText : ''}
                >
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          <div className={styles.checklistSection}>
            <h4 className={styles.sectionTitle}>{labels.after}</h4>
            {afterItems.map((item) => (
              <label key={item.id} className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={checked.has(item.id)}
                  onChange={() => toggleCheck(item.id)}
                  className={styles.checkbox}
                />
                <span
                  className={checked.has(item.id) ? styles.checkedText : ''}
                >
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          <button className={styles.copyBtn} onClick={handleCopy}>
            {labels.copy}
          </button>
        </div>
      )}
    </div>
  );
}
