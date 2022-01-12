import Post from '../../[...slug]';
import PostUtils from '../../../utils/PostUtils';
import TopSites from '../../../applications/top-sites/TopSites';

export const getStaticProps = async () => {

    const splitFileName = __filename.replace('.js', '').replace('.tsx', '').split('/');
    const pagesIndex = splitFileName.indexOf('pages');
    const slug = splitFileName.slice(pagesIndex + 1);

    const { source, meta } = await PostUtils.getMdxSource({ slug: slug.join('/') });

    return {
        props: {
            source,
            meta,
            slug,
        }
    }
}

const Index = ({ source, meta: { title, layout }, slug }) => {
    return (
        <Post source={source} meta={{ title, layout }} slug={slug}>
            <TopSites />
        </Post>
    )
}

export default Index;