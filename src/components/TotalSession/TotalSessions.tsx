import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './TotalSessions.module.css';

type Scope = 'season' | 'week' | 'month' | 'year' | 'all';

interface TotalSessionsProps {
  scope?: Scope;
}

async function getDateRange(scope: Scope): Promise<{ from: string | null; to: string | null }> {
  if (scope === 'all') {
    return { from: null, to: null };
  }

  if (scope === 'season') {
    const { data, error } = await supabase
      .from('seasons')
      .select('starts_at, ends_at')
      .order('ends_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return { from: null, to: null };
    }
    return { from: data.starts_at, to: data.ends_at };
  }

  const now = new Date();
  let from: Date;

  if (scope === 'week') {
    from = new Date(now);
    from.setDate(now.getDate() - now.getDay()); // start of week (Sunday)
    from.setHours(0, 0, 0, 0);
  } else if (scope === 'month') {
    from = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    from = new Date(now.getFullYear(), 0, 1);
  }

  return { from: from.toISOString(), to: now.toISOString() };
}

export default function TotalSessions({ scope = 'season' }: TotalSessionsProps) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTotal() {
      const { from, to } = await getDateRange(scope);

      let query = supabase.from('sessions').select('*', { count: 'exact', head: true });

      if (from) query = query.gte('logged_at', from);
      if (to) query = query.lte('logged_at', to);

      const { count, error } = await query;

      if (!cancelled && !error) {
        setTotal(count ?? 0);
      }
    }

    fetchTotal();

    return () => {
      cancelled = true;
    };
  }, [scope]);

  if (total === null) {
    return <h2 className={styles.totalSessions}>—</h2>;
  }

  return <h2 className={styles.totalSessions}>{total}</h2>;
}
