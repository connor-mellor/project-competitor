import { useState, useEffect } from 'react';
import styles from './CountdownBar.module.css';

const RESET_DATE = new Date(2026, 5, 29);

interface CountdownState {
  dateDisplay: string;
  daysLeft: string;
  daysLabel: string;
  countdownTime: string;
}

function calculateCountdown(): CountdownState {
  const now = new Date();
  const diff = RESET_DATE.getTime() - now.getTime();

  const dateDisplay = RESET_DATE.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase();

  if (diff <= 0) {
    return { dateDisplay, daysLeft: '0', daysLabel: 'Days Left', countdownTime: 'Season ended' };
  }

  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const h = Math.floor((totalSecs % 86400) / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  return {
    dateDisplay,
    daysLeft: String(days),
    daysLabel: days === 1 ? 'Day Left' : 'Days Left',
    countdownTime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
  };
}

export default function CountdownBar() {
  const [countdown, setCountdown] = useState<CountdownState>(calculateCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.countdownBar}>
      <div>
        <div className={styles.countdownLabel}>Season Reset</div>
        <div className={styles.countdownDate}>{countdown.dateDisplay}</div>
      </div>
      <div className={styles.countdownDays}>
        <div className={styles.daysNumber}>{countdown.daysLeft}</div>
        <div className={styles.daysLabel}>{countdown.daysLabel}</div>
        <div className={styles.countdownTime}>{countdown.countdownTime}</div>
      </div>
    </div>
  );
}