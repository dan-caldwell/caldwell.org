const arrowRight =
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
    </svg>;

const arrowLeft =
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
    </svg>;

type NextPreviousButtonsProps = {
    onNavigateSlide: (direction: 'next' | 'previous') => void,
    currentItem: number,
    totalItems: number,
    children?: React.ReactNode | React.ReactNode[]
}

const NextPreviousButtons: React.FC<NextPreviousButtonsProps> = ({ onNavigateSlide, currentItem, totalItems, children }) => {

    return (
        <>
            <button
                className={`ml-12 w-8 h-8 border transition-colors bg-gray-50 hover:bg-white border-gray-300 rounded-full ${currentItem === 1 ? 'invisible' : ''}`}
                onClick={() => onNavigateSlide('previous')}
            >{arrowLeft}</button>
            {children}
            <button
                className={`mr-12 w-8 h-8 border transition-colors bg-gray-50 hover:bg-white border-gray-300 rounded-full ${currentItem !== totalItems ? '' : 'invisible'}`}
                onClick={() => onNavigateSlide('next')}
            >{arrowRight}</button>
        </>
    )
}

export default NextPreviousButtons;