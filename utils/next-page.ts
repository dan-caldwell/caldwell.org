import PostUtils from "./PostUtils";

// A generalized version of getStaticProps meant for overriding MDX pages
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