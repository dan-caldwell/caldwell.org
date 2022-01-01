
type Props = {
    src: string;
    bg?: string;
}

const Thumbnail: React.FC<Props> = ({
    src,
    bg = 'blue-900'
}) => {

    const containerClassName = [
        'Thumbnail w-12 h-12 flex items-center justify-center',
        `bg-${bg}`
    ].join(' ');

    return (
        <div className={containerClassName}>
            <img src={src} draggable={false} className="w-full h-full p-1 select-none" />
        </div>
    )
}

export default Thumbnail;