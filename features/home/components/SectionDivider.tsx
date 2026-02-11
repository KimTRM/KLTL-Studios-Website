import "../css/SectionDivider.css";

type DividerVariant = "line" | "arc" | "dots" | "glow" | "drop";

interface SectionDividerProps {
    variant?: DividerVariant;
}

export default function SectionDivider({
    variant = "line",
}: SectionDividerProps) {
    switch (variant) {
        case "line":
            return (
                <div className="dividerLine">
                    <div className="dividerLineInner" />
                </div>
            );

        case "arc":
            return (
                <div className="dividerArc">
                    <svg
                        className="dividerArcSvg"
                        viewBox="0 0 200 40"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="dividerArcPath"
                            d="M 0 35 Q 100 -10 200 35"
                        />
                    </svg>
                </div>
            );

        case "dots":
            return (
                <div className="dividerDots">
                    <span className="dividerDot" />
                    <span className="dividerDot" />
                    <span className="dividerDot" />
                </div>
            );

        case "glow":
            return (
                <div className="dividerGlow">
                    <div className="dividerGlowInner" />
                </div>
            );

        case "drop":
            return (
                <div className="dividerDrop">
                    <div className="dividerDropLine" />
                    <div className="dividerDropDot" />
                </div>
            );

        default:
            return null;
    }
}
