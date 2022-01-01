import { ProjectMeta } from "../../utils/types";

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
        `SlideshowContainer h-full`,
        background ? `bg-${background}` : ''
    ].join(' ');

    return (
        <div className={containerClassName}>
            <div>{title}</div>
            {children}
        </div>
    )
}

export default SlideshowContainer;