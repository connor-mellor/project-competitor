import styles from './Home.module.css';

import Header from '@/components/Header';
import TotalSessions from '@/components/TotalSession';
import CountdownBar from '@/components/CountdownBar';

import { useState } from 'react';
import Board from '@/components/Board';

type Tab = 'all' | 'weekly';

export default function Home() {
  const [tab, setTab] = useState<Tab>('all');

  return (
    <div className={styles.homeContainer}>
      <Header />
      <div className={styles.totalSessionsContainer}>
        <TotalSessions />
        <p>days logged collectively this season</p>
      </div>
      <CountdownBar />
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${tab === 'all' ? styles.active : ''}`}
          onClick={() => setTab('all')}
        >
          All Time
        </button>
        <button
          className={`${styles.tabButton} ${tab === 'weekly' ? styles.active : ''}`}
          onClick={() => setTab('weekly')}
        >
          This Week
        </button>
      </div>
      <Board />
    </div>
  );
}
