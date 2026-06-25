import styles from './TotalSessions.module.css';

export default function TotalSessions() {
    return (
        <h2 className={styles.totalSessions}>999</h2>  
    )
};

//TODO: 
    // default fetch total sessions from db and display it in the component.
    // maybe add props to fetch by week, month, year, etc. and display the total sessions accordingly.