
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
            className="ScrollProgress text-xs w-16  px-2 flex items-center justify-center bg-opacity-50 mx-2"
        >
            <span className="flex font-bold text-center">{currentItem} / {numItems}</span>
        </div>
    )
}

export default ScrollProgress;