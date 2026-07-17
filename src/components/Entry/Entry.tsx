import styles from './Entry.module.css';

interface Member {
  id: number;
  rank: number;
  name: string;
  icon?: string;
  days: number;
}

interface EntryProps {
  member: Member;
  onAdd?: (id: number) => void;
  onSubtract?: (id: number) => void;
}

export default function Entry({ member, onAdd, onSubtract }: EntryProps) {
  return (
    <div className={styles.entry} id={`entry-${member.id}`}>
      <div className={styles.entryMain}>
        {/* Rank */}
        <div className={styles.entryRank}>{member.rank}</div>

        {/* Info */}
        <div className={styles.entryInfo}>
          <div className={styles.entryName}>
            {member.icon && <span className={styles.entryIcon}>{member.icon} </span>}
            {member.name}
          </div>

          {/* Phase placeholders */}
          <div className={styles.entryTagline}>Competitive streak builder</div>

          <div className={styles.entryBadges}>{/* placeholder for later */}</div>

          <div className={styles.entryLastLogged}>Last: —</div>

          <div className={styles.entryTodaySession}>
            <span className={styles.todaySessionLabel}>Last session:</span>{' '}
            <span style={{ color: 'var(--muted)' }}>—</span>
          </div>

          <div className={styles.entryInactive}>{/* placeholder */}</div>

          <div className={styles.rivalName}>{/* placeholder */}</div>
        </div>

        {/* Days */}
        <div className={styles.entryDays}>
          <div className={styles.daysCount}>{member.days}</div>
          <span className={styles.daysUnit}>days</span>
        </div>

        {/* Controls */}
        <div className={styles.entryControls}>
          <button
            className={`${styles.btnControl} ${styles.add}`}
            onClick={() => onAdd?.(member.id)}
          >
            +
          </button>

          <button
            className={`${styles.btnControl} ${styles.sub}`}
            onClick={() => onSubtract?.(member.id)}
            disabled={member.days <= 0}
          >
            −
          </button>
        </div>
      </div>

      {/* Reactions placeholder */}
      <div className={styles.reactionsRow} id={`reactions-${member.id}`} />

      {/* Expand placeholder */}
      <div className={styles.entryExpand}>
        <div className={styles.heatmapWrap} id={`heatmap-${member.id}`} />
      </div>
    </div>
  );
}
