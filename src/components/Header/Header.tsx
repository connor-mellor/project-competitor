import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>GYM<span className={styles.accent}>BOARD</span></h1>
            <p className={styles.subtitle}>Who's actually putting in the work</p>
        </header>
    )
};