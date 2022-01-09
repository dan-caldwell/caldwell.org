import Link from 'next/link';
import React from 'react';
import Logo from '../Logo';
import Hamburger from '../basic/Hamburger';
import XButton from '../basic/XButton';

type LogoHeaderProps = {
    title: string,
    href?: string,
    onClickHamburger?: () => void,
    hamburgerVisible?: boolean
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ title, href, onClickHamburger, hamburgerVisible }) => {
    return (
        <div className="
            flex max-w-full items-center border-b border-gray-300 cursor-pointer justify-between fixed w-full box-border bg-white
            xl:hover:bg-purple-50 xl:static"
        >
            <Link href={href}>
                <a className="text-black px-4 py-2 hover:no-underline flex items-center xl:w-full justify-start">
                    <Logo className="max-w-full w-8 h-8 mr-3 flex" fill="black" />
                    <div className="text-xl w-full">{title}</div>
                </a>
            </Link>
            <div className="xl:hidden" onClick={onClickHamburger}>
                {hamburgerVisible ? 
                    <Hamburger className="w-6 h-6 mr-4 cursor-pointer" /> : 
                    <XButton className="w-6 h-6 mr-4 cursor-pointer" />
                }
            </div>
        </div>

    );
}

export default LogoHeader