import { createContext, useContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export interface Member {
  id: string;
  name: string;
  is_admin: boolean;
  days: number;
  last_logged: Date | null;
  created_at: Date;
  streak: number;
  pb_streak: number;
}

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  member: Member | null;
  isLoggedIn: boolean;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<unknown>;
  signIn: (email: string, password: string) => Promise<unknown>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
