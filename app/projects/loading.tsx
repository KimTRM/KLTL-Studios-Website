import styles from "../system-ui.module.css";

export default function Loading() {
    return (
        <div className={styles.screenCenterCompact}>
            <div className={styles.panel}>
                <div className={styles.spinnerSmall} />
                <p className={styles.loadingText}>Loading projects&hellip;</p>
            </div>
        </div>
    );
}
