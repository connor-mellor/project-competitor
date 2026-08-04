import styles from './Board.module.css';
import Entry from '@/components/Entry';

export default function Board() {
  const members = [
    {
      id: 1,
      rank: 1,
      name: 'Ibiza final Boss',
      icon: '💪',
      days: 10,
    },
    {
      id: 2,
      rank: 2,
      name: 'Big Papa',
      icon: '🏋️‍♀️',
      days: 5,
    },
    {
      id: 3,
      rank: 3,
      name: 'Little Johnny',
      icon: '👶',
      days: 2,
    },
    {
      id: 4,
      rank: 4,
      name: 'The Underdog',
      icon: '🐶',
      days: 1,
    },
    {
      id: 5,
      rank: 5,
      name: 'The Newbie',
      icon: '🆕',
      days: 0,
    },
  ];

  return (
    <div className={styles.board}>
      {members.map((member) => (
        <Entry key={member.id} member={member} />
      ))}
    </div>
  );
}
