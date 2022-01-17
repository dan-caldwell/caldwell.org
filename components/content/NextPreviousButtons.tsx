import { ArrowLeft, ArrowRight } from '../icons/icons';

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
            ><ArrowLeft /></button>
            {children}
            <button
                className={`mr-12 w-8 h-8 border transition-colors bg-gray-50 hover:bg-white border-gray-300 rounded-full ${currentItem !== totalItems ? '' : 'invisible'}`}
                onClick={() => onNavigateSlide('next')}
            ><ArrowRight /></button>
        </>
    )
}

export default NextPreviousButtons;