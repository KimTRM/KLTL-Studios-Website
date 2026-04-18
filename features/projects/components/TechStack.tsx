import styles from "@/features/projects/css/ProjectPage.module.css";
import type { ProjectDetail } from "@/features/projects/data/projectDetails";

type Props = {
    role: ProjectDetail["role"];
    tools: ProjectDetail["tools"];
};

export default function TechStack({ role, tools }: Props) {
    return (
        <section className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Role and Tools</h2>

            <div className={styles.metaBlock}>
                <h3 className={styles.metaTitle}>Role</h3>
                <p className={styles.roleText}>{role}</p>
            </div>

            <div className={styles.metaBlock}>
                <h3 className={styles.metaTitle}>Tools</h3>
                <div className={styles.toolList}>
                    {tools.map((tool) => (
                        <span key={tool} className={styles.toolChip}>
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
