import React, { useRef, useContext } from 'react';
import NextPreviousButtons from './NextPreviousButtons';
import PrintPage from './PrintPage';
import ScrollProgress from './ScrollProgress';
import { PostContext } from '../context/PostContext';

const PrintPageContainer = ({ children }) => {
    const { currentScrollItem, setCurrentScrollItem } = useContext(PostContext);
    const scrollContainer = useRef(null);

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
        <>
            {children.length &&
                <div className="flex justify-center border-t border-b border-gray-300 mb-4 py-1 sticky top-0 z-10">
                    <NextPreviousButtons currentItem={currentScrollItem + 1} totalItems={children.length} onNavigateSlide={handleNavigateSlide}>
                        <ScrollProgress numItems={children.length} currentItem={currentScrollItem + 1} />
                    </NextPreviousButtons>
                </div>
            }
            < div
                className="PrintPageContainer flex-grow overflow-y-scroll w-container"
            >
                <div className="relative h-full w-full">
                    <div 
                        ref={scrollContainer} 
                        className="PrintPageContainer-OverflowContainer flex w-full h-full overflow-x-scroll snap-x-mandatory"
                    >
                        {(!children.length ? [children] : children).map((child, index) => (
                            <PrintPage
                                key={index}
                                className="snap-center snap-stop-always"
                                id={index}
                                onInView={id => setCurrentScrollItem(id)}
                                currentItem={currentScrollItem}
                            >
                                {child}
                            </PrintPage>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}

export default PrintPageContainer;