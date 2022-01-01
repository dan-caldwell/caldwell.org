import Head from "next/head";
import { useRouter } from "next/router";
import { ProjectMeta } from "../../utils/types";
import LogoHeader from "./LogoHeader";
import PostNavLink from "./PostNavLink";

export type NavigationProps = {
    category: string,
    projects: ProjectMeta[]
}

type NavbarProps = {
    list: NavigationProps[]
}

const Navbar: React.FC<NavbarProps> = ({ list }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Dan Caldwell</title>
                <meta name="description" content="Dan Caldwell" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-navbar h-screen border-r border-slate-200">
                <LogoHeader />
                <div className="flex flex-col">
                    {list.map(proj => (
                        <div
                            key={proj.category}
                        >
                            {proj.projects.map(projectData => (
                                <PostNavLink
                                    activePath={router.pathname}
                                    slug={projectData.slug}
                                    title={projectData.title}
                                    thumbnail={projectData.thumbnail}
                                    thumbnailBg={projectData.thumbnail_bg}
                                    category={proj.category}
                                    key={projectData.slug}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default Navbar;