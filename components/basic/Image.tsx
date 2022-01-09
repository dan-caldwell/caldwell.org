import { useEffect, useRef, useState, useContext } from 'react';
import XButton from './XButton';
import { PostContext } from '../context/PostContext';
import marked from 'marked';
import ReactHtmlParser from 'react-html-parser';

type ImageProps = {
    src: string,
    previewSrc?: string,
    alt: string,
    caption?: string,
    captionPosition?: 'top' | 'bottom',
    captionStyle?: 'regular' | 'italic',
    captionAlign?: 'left' | 'center' | 'right',
    fullWidth?: boolean,
    width?: number,
    height?: number,
    clickEnlarge?: boolean,
    float?: 'left' | 'right',
    className?: string,
    containerClassName?: string,
    center?: boolean,
    lazy?: boolean
}

const Image: React.FC<ImageProps> = ({
    src,
    previewSrc,
    caption,
    captionPosition = 'bottom',
    captionStyle = 'regular',
    captionAlign = 'center',
    alt,
    fullWidth = true,
    width,
    height,
    float = null,
    center = true,
    className = '',
    containerClassName = '',
    clickEnlarge = true,
    lazy = true
}) => {
    const [loadedSrc, setLoadedSrc] = useState<boolean>(false);
    const [imageRatio, setImageRatio] = useState<number>(0);
    // 0 = not enlarged
    // 1 = enlarged size 1
    // 2 = max enlarged (unused)
    const [enlarged, setEnlarged] = useState<number>(0);
    const [lazyLoad, setLazyLoad] = useState(lazy);
    const imageRef = useRef(null);
    const { currentScrollItem } = useContext(PostContext);

    if (float) fullWidth = false;

    const imgClassName = [
        !caption ? `mb-4 last:mb-0` : '',
        center ? 'mx-auto' : '',
        loadedSrc ? 'opacity-100' : 'opacity-0',
        fullWidth ? 'w-full' : '',
        clickEnlarge ? 'cursor-zoom-in' : '',
        `transition-opacity duration-200 ease-in-out object-contain top-0 max-w-full max-h-full`,
    ].join(' ');

    const captionClassName = [
        loadedSrc ? 'visible' : 'invisible',
        captionPosition === 'bottom' ? 'mt-2' : '',
        captionStyle === 'italic' ? 'italic text-gray-600' : '',
        `text-${captionAlign}`,
        'mb-4 last:mb-0 text-lg'
    ].join(' ');

    const captionHTML = <div className={captionClassName}>{ReactHtmlParser(marked(caption || ''))}</div>;

    useEffect(() => {
        const { width: boxWidth } = imageRef.current.getBoundingClientRect();
        setImageRatio(boxWidth / width);
    }, [width, setImageRatio]);

    useEffect(() => {
        if (imageRef.current && imageRef.current.complete && !loadedSrc) {
            setLoadedSrc(true)
        }
    }, [loadedSrc]);


    // This will remove the lazy load attribute one slide before the Image, so the image has time to load before being displayed
    useEffect(() => {
        if (imageRef.current && lazyLoad) {
            const printPage = imageRef.current?.closest('.PrintPage');
            const printPageId = Number(printPage?.dataset?.printPageId);
            if (!isNaN(printPageId) && printPageId - currentScrollItem === 1) {
                setLazyLoad(false);
            }
        }
    }, [currentScrollItem, lazyLoad]);

    return (
        <>
            <div
                className={`
                    ${fullWidth ? 'xl:h-full xl:w-full flex flex-col' : ''}
                    ${float ? `xl:float-${float}` : ''} float-none
                    ${containerClassName}
                `}
            >
                {(caption && captionPosition === 'top') && captionHTML}
                <div
                    className={`${fullWidth ? 'overflow-hidden' : ''}`}
                >
                    <img
                        src={previewSrc || src}
                        onLoad={() => setLoadedSrc(true)}
                        loading={lazyLoad ? 'lazy' : null}
                        alt={alt}
                        className={imgClassName + ' ' + className}
                        ref={imageRef}
                        style={{
                            width: width && imageRatio && !loadedSrc ?
                                imageRatio * width + 'px' :
                                null,
                            height: height && imageRatio && !loadedSrc ?
                                imageRatio * height + 'px' :
                                null,
                        }}
                        onClick={clickEnlarge ? () => setEnlarged(1) : null}
                    />
                </div>
                {(caption && captionPosition === 'bottom') && captionHTML}
            </div>
            {enlarged ?
                <>
                    <XButton
                        className='fixed z-40 top-0 right-0 text-white w-8 h-8 mt-2 mr-2 cursor-pointer shadow-md rounded-full'
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)'
                        }}
                        onClick={() => setEnlarged(0)}
                    />
                    <div
                        className="fixed z-20 inset-0 w-screen h-screen flex justify-center items-center overflow-y-scroll cursor-zoom-out"
                        onClick={() => setEnlarged(0)}
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        }}
                    >
                        <img
                            src={src || previewSrc}
                            className={`
                                z-30 select-none m-auto object-contain
                                w-auto h-full max-h-full max-w-full
                            `}
                            alt={alt}
                        />
                    </div>
                </>
                : null}
        </>
    )
}

export default Image;