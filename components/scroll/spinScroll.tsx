import { useEffect, useRef, useState } from "react";

type SpinScrollProps = {
    children: React.ReactNode[]
}

const timelineMax = 6000;

const SpinScroll: React.FC<SpinScrollProps> = ({ children }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const adjustedTimeline = useRef(timelineMax);

    const handleScroll = e => {
        setScrollTop(window.scrollY);
    }

    useEffect(() => {
        adjustedTimeline.current = timelineMax + window.innerHeight
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Timeline length for each child
    const childLengthRatios = [0.5, ...Array(children.length - 1).fill(1), -0.5];
    const totalTimelineRatio = childLengthRatios.reduce((a, b) => a + b, 0);
    const childMultiples = childLengthRatios.map(ratio => (ratio / totalTimelineRatio) * timelineMax);
    const childScrollCutoffs = childMultiples.map((multiple, index) => childMultiples.slice(0, index).reduce((a, b) => a + b, 0) + multiple);

    const currentChild = childScrollCutoffs.findIndex(item => scrollTop <= item);

    const previousCutoffValue = currentChild === 0 ? 0 : childScrollCutoffs[currentChild - 1];
    const progressScrollTotal = childScrollCutoffs[currentChild] - previousCutoffValue;
    const progress = (scrollTop - previousCutoffValue) / progressScrollTotal;
    const rotationRatio = 180 * childLengthRatios[currentChild];
    const rotation = (rotationRatio * progress) - (rotationRatio - 90);

    return (
        <>
            <div
                style={{
                    height: adjustedTimeline.current + 'px'
                }}
            >
                <div
                    className="sticky max-h-screen"
                    style={{
                        top: `50%`,
                        transform: `translate(0, -50%) perspective(100rem) rotateY(${rotation}deg)`
                    }}
                >
                    {children.map((child, index) => (
                        <div 
                            key={index} 
                            className={`w-full h-full ${currentChild === index ? "block" : "hidden"}`}
                        >{child}</div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default SpinScroll;