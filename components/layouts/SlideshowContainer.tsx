import React from "react";
import { ProjectMeta } from "../../utils/types";
import StandardWithTitle from "./StandardWithTitle";

type Props = {
    children: React.ReactNode | React.ReactNode[],
    meta: ProjectMeta
}

const SlideshowContainer: React.FC<Props> = ({
    children,
    meta: {
        title,
        background
    }
}) => {
    const containerClassName = [
        `SlideshowContainer`,
        background ? `bg-${background}` : ''
    ].join(' ');

    return (
        <StandardWithTitle className={containerClassName} title={title}>
            {children}
        </StandardWithTitle>
    )
}

export default SlideshowContainer;