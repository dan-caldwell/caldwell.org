import Link from "next/link";
import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import { PostMeta } from "../../utils/types";
import { PostContext } from "../context/PostContext";

export type SidebarListItemProps = {
    post: PostMeta,
    currentPost: string | null,
    isLast: boolean
}

const SidebarListItem: React.FC<SidebarListItemProps> = ({ post, currentPost, isLast }) => {
    const [loaded, setLoaded] = useState(false);
    const { title, slug, thumbnail, path, thumbnail_bg, thumbnail_padding } = post;
    const container = useRef(null);
    const { menuOpen } = useContext(PostContext);

    const fullSlug = useMemo(() => path.replace('.mdx', ''), [path]);

    const containerClass = `
        ${currentPost === fullSlug ? 'bg-purple-100' : 'xl:hover:bg-purple-50'}
        flex p-4 w-full
    `;

    const thumbnailClassName = [
        "w-16 h-16 mr-2 shrink-0 object-contain rounded",
        thumbnail_bg ? `bg-${thumbnail_bg}` : 'bg-slate-900',
        thumbnail_padding ? `p-${thumbnail_padding}` : 'p-1'
    ].join(' ');

    // Scroll to the element if it's not in view
    useEffect(() => {
        const parentBox = container.current.parentElement.getBoundingClientRect();
        const containerBox = container.current.getBoundingClientRect();
        const inView = containerBox.bottom >= parentBox.top && containerBox.top <= parentBox.bottom;
        if (currentPost === fullSlug && (!inView || !loaded || window.innerWidth <= 1184)) {
            container.current.scrollIntoView({
                block: "center"
            });
        }
        if (!loaded && currentPost) setLoaded(true);
    }, [currentPost, loaded, menuOpen, fullSlug]);

    return (
        <div className={`SidebarListItem flex border-gray-200 ${isLast ? '' : 'border-b'}`} ref={container}>
            <Link href={`/${fullSlug}/`} prefetch={false} scroll={currentPost !== slug}>
                <a className="hover:no-underline w-full break-normal">
                    <div className={containerClass}>
                        <img src={thumbnail} className={thumbnailClassName} alt={`${title} thumbnail`} />
                        <div>
                            {title}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default SidebarListItem;