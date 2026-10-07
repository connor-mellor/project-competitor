import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/AuthContext';
import styles from './CountdownBar.module.css';

interface Season {
  id: string;
  name: string;
  starts_at: string;
  ends_at: string;
}

interface CountdownState {
  dateDisplay: string;
  daysLeft: string;
  daysLabel: string;
  countdownTime: string;
}

function calculateCountdown(endsAt: Date, now: Date): CountdownState {
  const diff = endsAt.getTime() - now.getTime();

  const dateDisplay = endsAt
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase();

  if (diff <= 0) {
    return { dateDisplay, daysLeft: '0', daysLabel: 'Days Left', countdownTime: 'Season ended' };
  }

  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const h = Math.floor((totalSecs % 86400) / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  return {
    dateDisplay,
    daysLeft: String(days),
    daysLabel: days === 1 ? 'Day Left' : 'Days Left',
    countdownTime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
  };
}

export default function CountdownBar() {
  const { member } = useAuth();
  const [season, setSeason] = useState<Season | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSeason() {
      const { data, error } = await supabase
        .from('seasons')
        .select('*')
        .order('ends_at', { ascending: false })
        .limit(1)
        .single();

      if (!cancelled && !error && data) {
        setSeason(data);
      }
    }

    fetchSeason();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!season) return;

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [season]);

  const countdown = season ? calculateCountdown(new Date(season.ends_at), now) : null;

  function openEdit() {
    if (season) {
      setEditDate(season.ends_at.slice(0, 10));
    }
    setError(null);
    setIsEditing(true);
  }

  async function saveEdit() {
    if (!season || !editDate) return;
    setSaving(true);
    setError(null);

    const { data, error } = await supabase
      .from('seasons')
      .update({ ends_at: new Date(editDate).toISOString() })
      .eq('id', season.id)
      .select()
      .single();

    setSaving(false);

    if (error) {
      setError('Could not save — try again');
      return;
    }

    setSeason(data);
    setIsEditing(false);
  }

  if (!season || !countdown) {
    return null;
  }

  return (
    <div className={styles.countdownBar}>
      <div>
        <div className={styles.countdownLabel}>{season.name || 'Season Reset'}</div>
        {isEditing ? (
          <div className={styles.editRow}>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className={styles.editInput}
            />
            <button onClick={saveEdit} disabled={saving} className={styles.editSave}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setIsEditing(false)} className={styles.editCancel}>
              Cancel
            </button>
            {error && <span className={styles.editError}>{error}</span>}
          </div>
        ) : (
          <div className={styles.countdownDate}>{countdown.dateDisplay}</div>
        )}
      </div>
      <div className={styles.countdownDays}>
        <div className={styles.daysNumber}>{countdown.daysLeft}</div>
        <div className={styles.daysLabel}>{countdown.daysLabel}</div>
        <div className={styles.countdownTime}>{countdown.countdownTime}</div>
      </div>
      {member?.is_admin && !isEditing && (
        <button onClick={openEdit} className={styles.editButton} aria-label="Edit season">
          ✎
        </button>
      )}
    </div>
  );
}
