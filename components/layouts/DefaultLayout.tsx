import { ReactNode } from 'react';
import PostList from '../../json/post-list.json';
import Navbar from '../navigation/Navbar';

export type DefaultLayoutProps = {
    children: ReactNode,
}

const postList = JSON.parse(PostList);

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {

    return (
        <div>
            <div>
                {children}
            </div>
            <Navbar list={postList} />
        </div>
    )
}

export default DefaultLayout;