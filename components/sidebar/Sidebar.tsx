import React, { Fragment, useContext, useState } from "react";
import LogoHeader from './LogoHeader';
import SidebarListItem from "./SidebarListItem";
import { PostContext } from "../context/PostContext";
import Link from "next/link";
import Footer from "./Footer";
import SidebarGroup from "./SidebarGroup";
import { CaretDown, CaretRight } from "../icons/icons";

export type SidebarProps = {
    lists: any[],
}

const Sidebar: React.FC<SidebarProps> = ({ lists }) => {
    const { currentPost, menuOpen, setMenuOpen, openSection, setOpenSection } = useContext(PostContext);

    const handleClickHamburger = () => {
        setMenuOpen(!menuOpen);
    }

    // Show/hide section when clicking on the section label
    const handleClickSection = (sectionName: string) => {
        setOpenSection(openSection === sectionName ? null : sectionName);
    }

    return (
        <div className={`Sidebar bg-white xl:fixed top-0 w-sidebar xl:border-r xl:border-l xl:border-gray-300 flex-col justify-between flex flex-shrink-0 xl:h-full ${menuOpen ? 'h-full' : ''}`}>
            <div className="flex-col flex-grow xl:overflow-hidden flex">
                <LogoHeader title="Dan Caldwell" href="/" onClickHamburger={handleClickHamburger} hamburgerVisible={!menuOpen} />
                <div className={`flex-col xl:overflow-hidden xl:flex xl:mt-0 mt-16 ${menuOpen ? "flex" : "hidden"}`}>
                    <div className="w-full flex">
                        <Link href="/about">
                            <a className="px-4 py-2 w-full border-b border-gray-300 hover:no-underline hover:bg-purple-50">About</a>
                        </Link>
                    </div>
                    {lists.map((list, index) => (
                        <ExpandableList
                            list={list}
                            onClick={handleClickSection}
                            openSection={openSection}
                            currentPost={currentPost}
                            key={list.name}
                            isLast={index === lists.length - 1}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Sidebar;

const ExpandableList: React.FC<{
    list: any,
    onClick: (name: string) => void,
    openSection: string,
    currentPost: string,
    isLast: boolean 
}> = ({ list, onClick, openSection, currentPost, isLast }) => {

    const isExpanded = openSection === list.name;

    const labelClassName = [
        `cursor-pointer py-2 px-4 border-gray-300 flex items-center hover:no-underline hover:bg-purple-50 text-purple-600`,
        isLast && openSection && !isExpanded ? 'border-t' : 'border-b'
    ].join(' ');

    return (
        <>
            <div
                onClick={() => onClick(list.name)}
                className={labelClassName}
            >
                <div className="w-3 h-3 mr-2 text-black">{isExpanded ? <CaretDown /> : <CaretRight />}</div>
                <div>{list.label || list.name}</div>
            </div>
            <div
                className={`overscroll-contain xl:overflow-y-scroll flex-col flex-grow flex bg-white
                    ${isExpanded ? '' : 'hidden'}
                `}
            >
                {list.children.map((post: any) => {
                    if (!post.slug) {
                        // Format the name if necessary
                        const formattedName = post.name
                            .split('-')
                            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                        return <SidebarGroup key={post.name} title={post.title || formattedName} list={post.children} currentPost={currentPost} />
                    } else {
                        return <SidebarListItem currentPost={currentPost} key={post.slug} post={post} />
                    }
                })}
            </div>
        </>
    )
}