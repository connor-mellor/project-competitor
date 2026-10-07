// MyBoards.tsx
import styles from './MyBoards.module.css';

import Header from '@/components/Header';
import TotalSessions from '@/components/TotalSession';
import CountdownBar from '@/components/CountdownBar';
import Board from '@/components/Board';

import { useState } from 'react';
import { useTerm } from '@/themes/useTheme';

type Tab = 'all' | 'weekly';

export default function MyBoards() {
  const [tab, setTab] = useState<Tab>('all');
  const t = useTerm();

  return (
    <section className={styles.myBoardsContainer}>
      <Header
        titleSectionOne={t('titleOne')}
        titleSectionTwo={t('titleTwo')}
        subtitle={t('subtitle')}
      />
      <div className={styles.totalSessionsContainer}>
        <TotalSessions />
        <p>{t('daysLogged')}</p>
      </div>
      <CountdownBar />
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'all'}
          className={`${styles.tabButton} ${tab === 'all' ? styles.active : ''}`}
          onClick={() => setTab('all')}
        >
          {t('tabAllTime')}
        </button>
        <button
          role="tab"
          aria-selected={tab === 'weekly'}
          className={`${styles.tabButton} ${tab === 'weekly' ? styles.active : ''}`}
          onClick={() => setTab('weekly')}
        >
          {t('tabThisWeek')}
        </button>
      </div>
      <Board />
    </section>
  );
}
