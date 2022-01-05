import React from "react";
import { InView } from "react-intersection-observer";

type SlideProps = {
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    style?: {},
    id: number,
    onInView?: (id: number) => void,
    currentItem?: number
}

const Slide: React.FC<SlideProps> = ({ children, className = '', style = {}, id, onInView = () => { }, currentItem }) => {

    return (
        <InView threshold={0.5} onChange={value => value ? onInView(id) : null}>
            {({ ref }) => (
                <div
                    ref={ref}
                    data-slide-id={id}
                    className={`
                        Slide ${currentItem === id ? 'Slide-ActiveItem' : ''} mr-4 last:mr-0
                        flex-shrink-0 flex flex-col w-container h-full items-center
                        ${className}
                    `}
                    style={{
                        ...style
                    }}
                >
                    <div className="max-w-container Slide-Content h-full w-full flex flex-col">
                        {children}
                    </div>
                </div>
            )}
        </InView>
    )
}

export default Slide;