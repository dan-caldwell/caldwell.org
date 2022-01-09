import React from "react";
import { InView } from "react-intersection-observer";

type PrintPageProps = {
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    style?: {},
    id: number,
    onInView?: (id: number) => void,
    currentItem?: number
}

const PrintPage: React.FC<PrintPageProps> = ({ children, className = '', style = {}, id, onInView = () => { }, currentItem }) => {

    return (
        <InView threshold={0.5} onChange={value => value ? onInView(id) : null}>
            {({ ref }) => (
                <div
                    ref={ref}
                    data-print-page-id={id}
                    className={`
                        PrintPage ${currentItem === id ? 'PrintPage-ActiveItem' : ''} mr-4 last:mr-0
                        flex-shrink-0 flex flex-col w-container overflow-y-scroll h-full items-center
                        ${className}
                    `}
                    style={{
                        ...style
                    }}
                >
                    <div className="max-w-container PrintPage-Content h-full w-full flex flex-col">
                        {children}
                    </div>
                </div>
            )}
        </InView>
    )
}

export default PrintPage;