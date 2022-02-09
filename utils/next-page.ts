import PostUtils from "./PostUtils";

// A generalized version of getStaticProps meant for overriding MDX pages
export const getStaticMeta = async (slug: string) => {
    const { source, meta } = await PostUtils.getMdxSource({ slug });
    return {
        props: {
            source,
            meta,
            slug: slug.split('/'),
        }
    }
}