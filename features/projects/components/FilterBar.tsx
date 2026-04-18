type FilterOption = {
    label: string;
    value: string;
};

type Props = {
    options: FilterOption[];
    activeValue: string;
    onChange: (value: string) => void;
};

export default function FilterBar({ options, activeValue, onChange }: Props) {
    return (
        <div className="project-filters" role="tablist" aria-label="Project categories">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={activeValue === option.value ? "btn" : "btn-outline"}
                    role="tab"
                    aria-selected={activeValue === option.value}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
