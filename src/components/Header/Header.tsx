import styles from './Header.module.css';

type HeaderProps = {
  titleSectionOne?: string;
  titleSectionTwo?: string;
  subtitle?: string;
};

export default function Header({ titleSectionOne, titleSectionTwo, subtitle }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {titleSectionOne || ''} <span className={styles.accent}>{titleSectionTwo || ''}</span>
      </h1>
      <p className={styles.subtitle}>{subtitle || ''}</p>
    </header>
  );
}
