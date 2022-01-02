import { ReactNode } from 'react';
import PostList from '../../json/post-list.json';
import Navbar from '../navigation/Navbar';

export type LeftSidebarLayoutProps = {
    children: ReactNode,
}

const postList = JSON.parse(PostList);

const LeftSidebarLayout: React.FC<LeftSidebarLayoutProps> = ({ children }) => {

    return (
        <div
            className="flex"
        >
            <Navbar list={postList} />
            <div className="flex-grow bg-slate-50 min-h-screen">
                {children}
            </div>
        </div>
    )
}

export default LeftSidebarLayout;