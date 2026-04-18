import styles from "@/features/projects/css/ProjectPage.module.css";

type Props = {
    title: string;
    content: string;
};

export default function ProjectSection({ title, content }: Props) {
    return (
        <section className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.sectionBody}>{content}</p>
        </section>
    );
}
