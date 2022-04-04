import PostUtils from "./PostUtils";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    region: 'us-east-1'
});
const bucket = 'caldwell-apps';

// A generalized version of getStaticProps meant for overriding MDX pages
export const getStaticMeta = async (slug: string) => {
    const { source, meta } = await PostUtils.getMdxSource({ slug });
    const importedFiles = [];

    // Here we can import the import_srcs
    if (meta.import_src && Array.isArray(meta.import_src)) {
        for (const src of meta.import_src) {
            try {
                const { Body } = await s3.getObject({
                    Bucket: bucket,
                    Key: src
                }).promise();
                importedFiles.push({
                    src,
                    body: src.includes('json') ? JSON.parse(Body.toString()) : Body.toString()
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
    return {
        props: {
            source,
            meta,
            slug: slug.split('/'),
            importedFiles
        }
    }
}