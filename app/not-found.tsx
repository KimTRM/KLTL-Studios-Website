'use client'
import Link from 'next/link'
import styles from './system-ui.module.css'

export default function NotFound() {
    return (
        <div className={styles.screenCenter}>
            <section className={`${styles.panel} ${styles.panelWide}`}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.errorTitle}>Nothing here — yet.</h2>
                <p className={styles.errorText}>
                    This page doesn&apos;t exist. It may have moved, or maybe it never was. Either way, let&apos;s get you back on track.
                </p>
                <Link
                    href="/"
                    className={styles.primaryLink}
                >
                    Back to Home
                </Link>
            </section>
        </div>
    );
}
