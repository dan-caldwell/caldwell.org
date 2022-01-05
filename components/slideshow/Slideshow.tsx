import React, { useRef, useState } from "react";
import NextPreviousButtons from "../slideshow/NextPreviousButtons";
import ScrollProgress from "../slideshow/ScrollProgress";
import Slide from "./Slide";

type Props = {
    children: React.ReactNode[],
    height: number
}

const Slideshow: React.FC<Props> = ({
    children,
    height = 0
}) => {
    const [currentScrollItem, setCurrentScrollItem] = useState(0);
    const scrollContainer = useRef(null);

    const containerClassName = [
        `Slideshow`,
    ].join(' ');

    const handleNavigateSlide = (direction: 'next' | 'previous') => {
        const containerWidth = scrollContainer.current.scrollWidth;
        const pageWidth = containerWidth / children.length;
        const newScrollItem = direction === 'next' ? currentScrollItem + 1 : currentScrollItem - 1;
        scrollContainer.current.scrollTo({
            top: 0,
            left: pageWidth * newScrollItem,
        });
    }

    return (
        <div 
            className={containerClassName}
        >
            {children.length &&
                <div className="flex justify-center border-t border-b border-gray-300 mb-4 py-1 sticky top-0 bg-white z-10">
                    <NextPreviousButtons currentItem={currentScrollItem + 1} totalItems={children.length} onNavigateSlide={handleNavigateSlide}>
                        <ScrollProgress numItems={children.length} currentItem={currentScrollItem + 1} />
                    </NextPreviousButtons>
                </div>
            }
            < div
                className="flex-grow overflow-y-scroll w-container"
            >
                <div 
                    className="relative h-full w-full"
                    style={{
                        height: height + 'px'
                    }}
                >
                    <div
                        ref={scrollContainer}
                        className="Slideshow-OverflowContainer flex w-full h-full overflow-x-scroll snap-x-mandatory"
                    >
                        {(!children.length ? [children] : children).map((child, index) => (
                            <Slide
                                key={index}
                                className="snap-center snap-stop-always"
                                id={index}
                                onInView={id => setCurrentScrollItem(id)}
                                currentItem={currentScrollItem}
                            >
                                {child}
                            </Slide>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slideshow;