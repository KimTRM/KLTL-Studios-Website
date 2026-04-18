import styles from "./system-ui.module.css";

export default function Loading() {
    return (
        <div className={styles.screenCenter}>
            <div className={`${styles.panel} ${styles.panelWide}`}>
                <div className={styles.spinner} />
                <p className={styles.loadingText}>Getting things ready&hellip;</p>
            </div>
        </div>
    );
}
