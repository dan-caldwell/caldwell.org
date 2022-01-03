import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ProjectMeta } from "../../utils/types";
import LogoHeader from "./LogoHeader";
import PostNavLink from "./PostNavLink";
import { Dash, Plus } from "../icons/icons";
import Link from "next/link";

export type NavigationProps = {
    category: string,
    projects: ProjectMeta[]
}

type NavbarProps = {
    list: NavigationProps[]
}

const Navbar: React.FC<NavbarProps> = ({ list }) => {
    const [expandedSections, setExpandedSections] = useState(["projects"]);
    const [collapsedCategories, setCollapsedCategories] = useState([]);
    const router = useRouter();

    const handleExpandProjects = () => {
        setExpandedSections(oldSections => {
            return pushRemoveFromArray('projects', oldSections);
        });
    }

    const handleExpandCategory = (category: string) => {
        setCollapsedCategories(oldCats => {
            return pushRemoveFromArray(category, oldCats);
        });
    }

    const projectsExpanded = expandedSections.includes('projects');

    return (
        <>
            <Head>
                <title>Dan Caldwell</title>
                <meta name="description" content="Dan Caldwell" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-navbar h-screen border-r border-slate-300">
                <LogoHeader />
                <div className="flex flex-col border-b border-slate-300">
                    <LinkSectionLabel
                        title="About"
                        href="/about"
                        pathname={router.pathname}
                    />
                    <ExpandableSectionLabel
                        onClick={handleExpandProjects}
                        expanded={projectsExpanded}
                        title="Projects"
                    />
                    <div className={`overflow-hidden ${projectsExpanded ? '' : 'hidden'}`}>
                        <div className="border-slate-300 bg-white shadow-xl">
                            {list.map(proj => (
                                <div
                                    key={proj.category}
                                    className="border-t border-slate-300 first:border-t-0"
                                >
                                    <CategoryLabel
                                        title={proj.category}
                                        onClick={() => handleExpandCategory(proj.category)}
                                        expanded={!collapsedCategories.includes(proj.category)}
                                    />
                                    {proj.projects.map(projectData => (
                                        <PostNavLink
                                            key={projectData.slug}
                                            category={proj.category}
                                            activePath={router.pathname}
                                            meta={projectData}
                                            paddingLeft={4}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Navbar;

const pushRemoveFromArray = (item: string, array: string[]) => {
    const newArray = [...array];
    const sectionIndex = array.indexOf(item);
    if (sectionIndex === -1) {
        newArray.push(item);
    } else {
        newArray.splice(sectionIndex, 1);
    }
    return newArray;
}

const ExpandableSectionLabel = ({ title, onClick, expanded }) => {
    const className = [
        `pl-2 py-0.5 cursor-pointer bg-white hover:bg-purple-50 flex justify-between items-center fill-semi-black`,
        expanded ? 'border-b border-slate-300' : ''
    ].join(' ');
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <div>{title}</div>
            <div className="w-3 h-3 mr-2 flex items-center justify-center">
                {expanded ? <Dash /> : <Plus />}
            </div>
        </div>
    )
}

const LinkSectionLabel = ({
    title,
    href,
    pathname
}) => (
    <Link href={href} prefetch={false}>
        <a className={`pl-2 border-b border-slate-300 py-0.5 hover:bg-purple-50 ${pathname === href ? 'bg-purple-100 hover:bg-purple-100' : 'hover:bg-purple-50'}`}>{title}</a>
    </Link>
)

const CategoryLabel = ({
    title,
    onClick,
    expanded
}) => (
    <div
        onClick={onClick}
        className={`pl-4 py-0.5 text-xs border-b border-slate-300 bg-slate-100 cursor-pointer flex justify-between items-center`}
    >
        <div>
            {title.charAt(0).toUpperCase() + title.slice(1)}
        </div>
        <div className="w-2 h-2 mr-2 flex items-center justify-center">
            {expanded ? <Dash /> : <Plus />}
        </div>
    </div>
)