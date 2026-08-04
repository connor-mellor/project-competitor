import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import LoginForm from '@/components/LoginForm';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (!isLoggedIn) return <LoginForm />;

  return <>{children}</>;
}
