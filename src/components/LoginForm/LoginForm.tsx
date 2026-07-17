import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import styles from './LoginForm.module.css';

type Mode = 'login' | 'signup';

export default function LoginForm() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!email || !password) {
      setError('Enter both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        setInfo('Check your email to confirm your account, then log in.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  function toggleMode() {
    setMode((m) => (m === 'login' ? 'signup' : 'login'));
    setError('');
    setInfo('');
  }

  return (
    <div className={styles.wrapper}>
      <h2>{mode === 'login' ? 'Log in to GymBoard' : 'Create your GymBoard account'}</h2>

      {error && <div className={styles.error}>{error}</div>}
      {info && <div className={styles.info}>{info}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </button>
      </form>

      <button type="button" className={styles.toggleButton} onClick={toggleMode}>
        {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
      </button>
    </div>
  );
}
