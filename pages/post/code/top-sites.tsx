import Post from '../../[...slug]';
import TopSites from '../../../applications/top-sites/TopSites';
export { getStaticProps } from '../../../utils/next-page';

const Index = (props) => {
    return (
        <Post {...props}>
            <TopSites />
        </Post>
    )
}

export default Index;