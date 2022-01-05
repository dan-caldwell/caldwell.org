
type ScrollProgressProps = {
    numItems: number,
    currentItem: number,
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
    numItems = 0,
    currentItem = 0,
}) => {

    return (
        <div 
            className="ScrollProgress text-xs px-2 flex flex-col align-center justify-center bg-opacity-50 mx-2"
        >
            <span className="flex">{currentItem} / {numItems}</span>
        </div>
    )
}

export default ScrollProgress;