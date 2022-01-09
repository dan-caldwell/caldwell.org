import { useState } from "react";

const Image: React.FC<{
    src: string;
    className?: string;
    lazyLoad?: boolean;
    caption?: string;
    alt?: string;
    captionPosition?: 'top' | 'bottom';
    captionStyle?: 'regular' | 'italic';
    captionAlign?: 'left' | 'center' | 'right';
    fullWidth?: boolean;
    float?: 'left' | 'right';
    containerClassName?: string;
}> = ({
    src,
    className,
    caption = '',
    alt = '',
    captionPosition = 'bottom',
    captionStyle = 'regular',
    captionAlign = 'center',
    lazyLoad = true,
    fullWidth = true,
    float = null,
    containerClassName = '',
}) => {
    const [loadedSrc, setLoadedSrc] = useState(false);

    const imgClassName = [
        'Image transition-opacity duration-200 ease-in-out max-w-full max-h-full object-contain',
        loadedSrc ? 'opacity-100' : 'opacity-0',
        className
    ].join(' ');

    const captionClassName = [
        loadedSrc ? 'visible' : 'invisible',
        captionPosition === 'bottom' ? 'mt-2' : '',
        captionStyle === 'italic' ? 'italic text-gray-600' : '',
        `text-${captionAlign}`,
        'mb-4 last:mb-0 text-lg'
    ].join(' ');

    const captionHTML = <div className={captionClassName}>{caption || ''}</div>;

    return (
        <div
            className={`
                ${fullWidth ? 'xl:h-full xl:w-full flex flex-col' : ''}
                ${float ? `xl:float-${float}` : ''} float-none
                ${containerClassName}
            `}
        >
            {(caption && captionPosition === 'top') && captionHTML}
            <img 
                src={src} 
                className={imgClassName} 
                loading={lazyLoad ? 'lazy' : null}
                onLoad={() => setLoadedSrc(true)}
                alt={alt}
            />
            {(caption && captionPosition === 'bottom') && captionHTML}
        </div>
    )
}

export default Image;