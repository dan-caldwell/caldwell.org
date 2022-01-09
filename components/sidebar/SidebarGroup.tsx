import React from "react";
import SidebarListItem from "./SidebarListItem";

const SidebarGroup: React.FC<{
    title: string,
    list: any[],
    currentPost: string
}> = ({
    title = '',
    list = [],
    currentPost = ''
}) => {
    return (
        <div className="SidebarGroup">
            <div
                className="text-xs border-b border-gray-200 px-4 py-0.5 bg-gray-50"
            >{title}</div>
            <div>
                {list.map(post => <SidebarListItem currentPost={currentPost} key={post.slug} post={post} />)}
            </div>
        </div>
    )
}

export default SidebarGroup;