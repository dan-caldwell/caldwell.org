import React, { useRef, useState } from "react";
import { ProjectMeta } from "../../utils/types";
import NextPreviousButtons from "../slideshow/NextPreviousButtons";
import ScrollProgress from "../slideshow/ScrollProgress";
import Slide from "../slideshow/Slide";
import StandardWithTitle from "./StandardWithTitle";

type Props = {
    children: React.ReactNode[],
    meta: ProjectMeta
}

const SlideshowContainer: React.FC<Props> = ({
    children,
    meta: {
        title,
        background
    }
}) => {
    const [currentScrollItem, setCurrentScrollItem] = useState(0);
    const scrollContainer = useRef(null);

    const containerClassName = [
        `SlideshowContainer`,
        background ? `bg-${background}` : ''
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
        <StandardWithTitle className={containerClassName} title={title}>
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
                <div className="relative h-full w-full">
                    <div
                        ref={scrollContainer}
                        className="SlideshowContainer-OverflowContainer flex w-full h-full overflow-x-scroll snap-x-mandatory"
                    >
                        {(Array.isArray(children) ? children : [children]).map((child, index) => (
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
            </div >
        </StandardWithTitle>
    )
}

export default SlideshowContainer;