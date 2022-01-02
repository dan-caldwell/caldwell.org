import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProjectMeta } from "../../utils/types";
import LogoHeader from "./LogoHeader";
import PostNavLink from "./PostNavLink";
import { Dash, Plus } from "../icons/icons";

export type NavigationProps = {
    category: string,
    projects: ProjectMeta[]
}

type NavbarProps = {
    list: NavigationProps[]
}

const Navbar: React.FC<NavbarProps> = ({ list }) => {
    const [expandedSections, setExpandedSections] = useState(["projects"]);
    const router = useRouter();

    const handleExpandProjects = () => {
        setExpandedSections(oldSections => {
            const newSections = [...oldSections];
            const sectionIndex = expandedSections.indexOf('projects');
            if (sectionIndex === -1) {
                newSections.push('projects');
            } else {
                newSections.splice(sectionIndex, 1);
            }
            return newSections;
        });
    }

    const projectsExpanded = expandedSections.includes('projects');

    const projectsLabelClassName = [
        `pl-2 py-0.5 cursor-pointer bg-white hover:bg-purple-50 flex justify-between items-center fill-semi-black`,
        projectsExpanded ? 'border-b border-slate-300' : ''
    ].join(' ');

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
                    <div
                        className={projectsLabelClassName}
                        onClick={handleExpandProjects}
                    >
                        <div>Projects</div>

                        <div className="w-3 h-3 mr-2 flex items-center justify-center">
                            {projectsExpanded ? <Dash /> : <Plus />}
                        </div>
                    </div>
                    <div className={`overflow-hidden ${projectsExpanded ? '' : 'hidden'}`}>
                        <div className="ml-2 border-l border-slate-300 bg-white shadow-xl">
                            {list.map(proj => (
                                <div
                                    key={proj.category}
                                    className="border-t border-slate-300 first:border-t-0"
                                >
                                    <div
                                        className="pl-2 py-0.5 text-sm border-b border-slate-300"
                                    >{proj.category.charAt(0).toUpperCase() + proj.category.slice(1)}</div>
                                    {proj.projects.map(projectData => (
                                        <PostNavLink
                                            key={projectData.slug}
                                            category={proj.category}
                                            activePath={router.pathname}
                                            meta={projectData}
                                            paddingLeft={2}
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