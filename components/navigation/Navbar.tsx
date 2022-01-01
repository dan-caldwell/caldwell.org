import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { NavigationProps } from "../../server-utils/navigation";

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
            <div>
                {list.map(proj => (
                    <div key={proj.category}>
                        {proj.projects.map(projectData => (
                            <Link key={projectData.slug} prefetch={false} href={`/projects/${proj.category}/${projectData.slug}`}>
                                <a className={router.pathname === `/projects/${proj.category}/${projectData.slug}` ? 'bg-red-500' : ''}>
                                    {projectData.title || projectData.slug}
                                </a>
                            </Link>

                        ))}
                    </div>
                ))}
            </div>
        </>
    )

}

export default Navbar;