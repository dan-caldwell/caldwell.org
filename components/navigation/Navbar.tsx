import { useContext, useEffect } from "react";
import { NavContext } from "../../context/NavContext";
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { NavigationProps } from "../../server-utils/navigation";

type NavbarProps = {
    list: NavigationProps[]
}

const Navbar: React.FC<NavbarProps> = ({ list }) => {
    const { currentPost, setCurrentPost } = useContext(NavContext);
    const router = useRouter();

    useEffect(() => {
        setCurrentPost(router.pathname);
    }, [router.pathname, setCurrentPost]);

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
                        {proj.projects.map(slug => (
                            <Link key={slug} prefetch={false} href={`/projects/${proj.category}/${slug}`}>
                                <a className={currentPost === `/projects/${proj.category}/${slug}` ? 'bg-red-500' : ''}>
                                    {slug}
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