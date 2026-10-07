import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './Board.module.css';
import Entry from '@/components/Entry';

interface BoardMember {
  id: number;
  rank: number;
  name: string;
  icon: string;
  days: number;
}

export default function Board() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchBoard = useCallback(async () => {
    const { data: season } = await supabase
      .from('seasons')
      .select('starts_at, ends_at')
      .order('ends_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: memberRows, error: memberError } = await supabase
      .from('members')
      .select('id, name, icon');

    if (memberError || !memberRows) {
      if (mountedRef.current) setLoading(false);
      return;
    }

    let sessionQuery = supabase.from('sessions').select('member_id, logged_at');
    if (season?.starts_at) sessionQuery = sessionQuery.gte('logged_at', season.starts_at);
    if (season?.ends_at) sessionQuery = sessionQuery.lte('logged_at', season.ends_at);

    const { data: sessionRows, error: sessionError } = await sessionQuery;

    if (sessionError || !sessionRows) {
      if (mountedRef.current) setLoading(false);
      return;
    }

    const daysByMember = new Map<number, Set<string>>();
    for (const s of sessionRows) {
      const day = s.logged_at.slice(0, 10);
      if (!daysByMember.has(s.member_id)) {
        daysByMember.set(s.member_id, new Set());
      }
      daysByMember.get(s.member_id)!.add(day);
    }

    const ranked = memberRows
      .map((m) => ({
        id: m.id,
        name: m.name,
        icon: m.icon ?? '💪',
        days: daysByMember.get(m.id)?.size ?? 0,
      }))
      .sort((a, b) => b.days - a.days)
      .map((m, i) => ({ ...m, rank: i + 1 }));

    if (mountedRef.current) {
      setMembers(ranked);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  async function handleAdd(memberId: number) {
    const { error } = await supabase
      .from('sessions')
      .insert({ member_id: memberId, logged_at: new Date().toISOString() });

    if (!error) fetchBoard();
  }

  async function handleSubtract(memberId: number) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { data: todaysSessions } = await supabase
      .from('sessions')
      .select('id')
      .eq('member_id', memberId)
      .gte('logged_at', todayStart.toISOString())
      .order('logged_at', { ascending: false })
      .limit(1);

    if (todaysSessions && todaysSessions.length > 0) {
      await supabase.from('sessions').delete().eq('id', todaysSessions[0].id);
      fetchBoard();
    }
  }

  if (loading) {
    return <div className={styles.board}>Loading…</div>;
  }

  return (
    <div className={styles.board}>
      {members
        .filter((m) => m.name.toLowerCase() !== 'admin') // temp remove admin from board display
        .map((member) => (
          <Entry key={member.id} member={member} onAdd={handleAdd} onSubtract={handleSubtract} />
        ))}
    </div>
  );
}
