import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function GridContainer({ children }: Props) {
    return <div className="project-grid">{children}</div>;
}
