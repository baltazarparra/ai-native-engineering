import { useOthers } from '@liveblocks/react';
import styles from './RemoteCursors.module.css';

export default function RemoteCursors() {
  const others = useOthers();

  return (
    <div className={styles.layer} aria-hidden="true">
      {others.map((user) => {
        const cursor = user.presence.cursor;
        if (!cursor) return null;
        const color = user.presence.color || 'var(--color-accent-1)';
        return (
          <div
            key={user.connectionId}
            className={styles.cursor}
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}
