'use client';

import styles from './Navigation.module.css';
import GymsterLogo from '@/assets/images/gymster-dark.png';
import { Menu, X, Trophy, LayoutDashboard, Users, Flame, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemePicker from '../ThemePicker/ThemePicker';

type NavigationProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type NavItem = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

export default function Navigation({ open, setOpen }: NavigationProps) {
  const navItems: NavItem[] = [
    { to: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { to: '/boards', icon: <Users />, label: 'My Boards' },
    { to: '/rankings', icon: <Trophy />, label: 'Rankings' },
    { to: '/challenges', icon: <Flame />, label: 'Challenges' },
    { to: '/profile', icon: <User />, label: 'Profile' },
    { to: '/settings', icon: <Settings />, label: 'Settings' },
  ];

  return (
    <nav className={`${styles.navigation} ${open ? styles.open : ''}`}>
      <button
        className={styles.menuTab}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>

      <div className={styles.scrollArea}>
        <div className={styles.imageContainer}>
          <img src={GymsterLogo} alt="Gymster" />
        </div>
        <div className={styles.navLinks}>
          {navItems.slice(0, 4).map((item) => (
            <Link className={styles.navLink} to={item.to} key={item.label}>
              {item.icon}
              {item.label}
            </Link>
          ))}
          <ThemePicker />
        </div>
        <div className={styles.bottomLinks}>
          {navItems.slice(-2).map((item) => (
            <Link className={styles.navLink} to={item.to} key={item.label}>
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
