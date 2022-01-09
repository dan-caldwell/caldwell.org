import React, { ReactNode, useContext, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import { PostContext } from "../context/PostContext";
import ProjectsList from '../../json/projects-post-list.json';
import BlogList from '../../json/blog-post-list.json';

export type PageWithSidebarProps = {
    children: ReactNode,
}

const listsOfPosts = [ProjectsList, BlogList].map(item => JSON.parse(item));

const PageWithSidebar: React.FC<PageWithSidebarProps> = ({ children }) => {
    const { menuOpen, currentPost } = useContext(PostContext);
    const mainRef = useRef(null);

    useEffect(() => {
        // Scroll to the top of the main element
        setTimeout(() => {
            mainRef.current.scrollTo(0, 0);
            window.scrollTo(0, 0);
        }, 50);
    }, [currentPost]);

    const appHeight = async () => {
        await timeout(100);
        document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    }

    const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Fix screen sizing on mobile
    useEffect(() => {
        window.addEventListener('resize', appHeight);
        appHeight();
        return () => window.removeEventListener('resize', appHeight);
    });

    return (
        <div className="flex flex-col xl:flex-row xl:justify-between bg-gray-100">
            <Sidebar lists={listsOfPosts} />
            <main ref={mainRef} className={`
                flex-col px-4 mt-16 m-sidebar overflow-y-hidden h-full w-full
                xl:min-h-full xl:px-0 xl:mt-0 ${menuOpen ? 'hidden xl:flex' : 'flex'}`}
            >
                <div className="mx-auto w-container h-full w-full flex-col flex">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default PageWithSidebar;