import { useState } from "react";

const Image: React.FC<{
    src: string;
    className?: string;
    lazyLoad?: boolean
}> = ({
    src,
    className,
    lazyLoad = true
}) => {
    const [loadedSrc, setLoadedSrc] = useState(false);

    const imgClassName = [
        'Image transition-opacity duration-200 ease-in-out max-w-full max-h-full',
        loadedSrc ? 'opacity-100' : 'opacity-0',
        className
    ].join(' ');

    return (
        <img 
            src={src} 
            className={imgClassName} 
            loading={lazyLoad ? 'lazy' : null}
            onLoad={() => setLoadedSrc(true)}
        />
    )
}

export default Image;