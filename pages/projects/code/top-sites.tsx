import Post from '../../[...slug]';
import TopSites from '../../../applications/top-sites/TopSites';
import Anchor from '../../../components/basic/Anchor';
export { getStaticProps } from '../../../utils/next-page';

const Index = (props) => {
    return (
        <Post {...props}>
            <p>A list of the 1 million most popular URLs via the <Anchor href="http://s3-us-west-1.amazonaws.com/umbrella-static/index.html">Cisco Umbrella Popularity List</Anchor>.
            Updates every day.
            </p>
            <TopSites />
        </Post>
    )
}

export default Index;