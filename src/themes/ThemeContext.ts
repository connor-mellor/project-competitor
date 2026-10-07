// src/themes/ThemeContext.ts
import { createContext } from 'react';
import type { Theme, ThemeId } from './themes';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (id: ThemeId) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
