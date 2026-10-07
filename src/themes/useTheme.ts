// src/themes/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { TermKey } from './themes';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

export function useTerm() {
  const { theme } = useTheme();
  return (key: TermKey) => theme.vocab[key];
}
