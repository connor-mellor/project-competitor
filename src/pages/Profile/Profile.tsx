import Header from '@/components/Header';
import styles from './Profile.module.css';

export default function Profile() {
  return (
    <section className={styles.profileContainer}>
      <Header
        titleSectionOne="MY"
        titleSectionTwo="PROFILE"
        subtitle="Your personal fitness profile"
      />
      <div>
        <div className={styles.container}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>🔥</span>
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>Sexy bish</h2>
            <p className={styles.subtitle}>Title: Fitness Gusher</p>
          </div>
        </div>
        <div>
          <div className={styles.rankContainer}>
            <span className={styles.rankIcon}>🔟</span>
            <div className={styles.rankTextContainer}>
              <h3>Rank: 10</h3>
              <div className={styles.experienceContainer}>
                <p>Experience: 1000 XP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
