
type Props = {
    src: string;
    bg?: string;
    thumbnailPadding?: number;
    className?: string;
}

const Thumbnail: React.FC<Props> = ({
    src,
    bg = 'blue-900',
    thumbnailPadding = 1,
    className = ''
}) => {

    const containerClassName = [
        'Thumbnail w-12 h-12 flex items-center justify-center rounded',
        className,
        `bg-${bg}`
    ].join(' ');

    const imageClassName = [
        `w-full h-full select-none`,
        `p-${thumbnailPadding}`
    ].join(' ');

    return (
        <div className={containerClassName}>
            <img src={src} draggable={false} className={imageClassName} />
        </div>
    )
}

export default Thumbnail;