import Image from "next/image";
import "../css/ProjectSection.css";
import Link from "next/link";

interface Props {
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function ProjectCard(props: Props) {
    return (
        <Link href={props.link} className="project-card" aria-label={`View details about ${props.title} project`}>
            <article>
                <div className="project-icon">
                    <Image
                        src={props.image}
                        alt={`${props.title} icon`}
                        width={460}
                        height={160}
                        loading="lazy"
                        sizes="(max-width: 700px) 90vw, 280px"
                    />
                </div>
                <b>{props.title}</b>
                <p>{props.description}</p>
            </article>
        </Link>
    );
}
