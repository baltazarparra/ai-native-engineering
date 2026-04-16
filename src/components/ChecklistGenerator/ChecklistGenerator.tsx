import { useState, useMemo, useCallback } from 'react';
import { profiles, tasks, getChecklist } from '../../data/checklists';
import styles from './ChecklistGenerator.module.css';

export default function ChecklistGenerator() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const checklist = useMemo(() => {
    if (!selectedProfile || !selectedTask) return [];
    return getChecklist(selectedProfile, selectedTask);
  }, [selectedProfile, selectedTask]);

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
    lines.push('ANTES DE PEDIR:');
    beforeItems.forEach((item) => {
      lines.push(`${checked.has(item.id) ? '[x]' : '[ ]'} ${item.text}`);
    });
    lines.push('');
    lines.push('ANTES DE ACEITAR:');
    afterItems.forEach((item) => {
      lines.push(`${checked.has(item.id) ? '[x]' : '[ ]'} ${item.text}`);
    });

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {
      // clipboard unavailable
    }
  }, [beforeItems, afterItems, checked]);

  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <span className={styles.stepLabel}>1. Qual e seu perfil?</span>
        <div className={styles.buttons} role="group" aria-label="Perfil">
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
          <span className={styles.stepLabel}>2. Que tipo de tarefa?</span>
          <div
            className={styles.buttons}
            role="group"
            aria-label="Tipo de tarefa"
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
            <h4 className={styles.sectionTitle}>Antes de pedir</h4>
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
            <h4 className={styles.sectionTitle}>Antes de aceitar</h4>
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
            Copiar checklist
          </button>
        </div>
      )}
    </div>
  );
}
