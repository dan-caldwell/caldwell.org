
type ScrollProgressDotsProps = {
    numItems: number,
    currentItem: number
}

const circleWrapper = (child, fill = 'currentColor') =>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fill} className="h-1.5 w-1.5" viewBox="0 0 16 16">
        {child}
    </svg>;

const circle = circleWrapper(
    <circle cx="8" cy="8" r="8" />
, '#cbd5e0');

const circleFill = circleWrapper(
    <circle cx="8" cy="8" r="8" />
, '#7c3aed');

const ScrollProgressDots: React.FC<ScrollProgressDotsProps> = ({ numItems, currentItem }) => {
    const dots = [...Array(numItems).keys()].map((item, index) => (
        <span 
            className="mr-1 last:mr-0 flex items-center justify-center" 
            key={index}
        >{item === currentItem ? circleFill : circle}</span>
    ))

    return (
        <div className="box-border text-white flex items-center justify-center bg-white border-b border-gray-200 xl:h-10 p-1.5 xl:p-0 border-t">
            {dots}
        </div>
    )
}

export default ScrollProgressDots;