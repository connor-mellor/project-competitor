'use client';

import styles from './Navigation.module.css';
import GymsterLogo from '@/assets/images/gymster-dark.png';

import {
  Menu,
  X,
  Trophy,
  LayoutDashboard,
  Dumbbell,
  Users,
  Flame,
  User,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type NavigationProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Navigation({ open, setOpen }: NavigationProps) {
  return (
    <nav className={`${styles.navigation} ${open ? styles.open : ''}`}>
      <button
        className={styles.menuTab}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
      <div className={styles.imageContainer}>
        <img src={GymsterLogo} alt="Gymster" />
      </div>
      <div className={styles.navLinks}>
        <Link className={styles.navLink} to="/rankings">
          <Trophy />
          Rankings
        </Link>
        <Link className={styles.navLink} to="/dashboard">
          <LayoutDashboard />
          Dashboard
        </Link>
        <Link className={styles.navLink} to="/log-workout">
          <Dumbbell />
          Log Workout
        </Link>
        <Link className={styles.navLink} to="/boards">
          <Users />
          My Boards
        </Link>
        <Link className={styles.navLink} to="/challenges">
          <Flame />
          Challenges
        </Link>
      </div>
      <div className={styles.bottomLinks}>
        <Link className={styles.navLink} to="/profile">
          <User />
          Profile
        </Link>
        <Link className={styles.navLink} to="/settings">
          <Settings />
          Settings
        </Link>
      </div>
    </nav>
  );
}
