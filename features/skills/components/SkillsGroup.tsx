interface SkillsGroupProps {
    title: string;
    description: string;
}

export default function SkillsGroup({ title, description }: SkillsGroupProps) {
    return (
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
}
