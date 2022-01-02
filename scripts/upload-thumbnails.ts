import fs from 'fs-extra';
import path from 'path';
import { s3, putImage, bucket } from '../utils/aws';
import { getPostList } from '../utils/post-metadata';

const uploadThumbnails = async () => {
    const categoryList = getPostList();
    for (const catObj of categoryList) {
        for (const meta of catObj.projects) {
            const { thumbnail, slug } = meta;
            // Ignore if there is no thumbnail or the thumbnail is already uploaded
            if (!thumbnail || thumbnail.includes(`s3.amazonaws.com/${bucket}/`)) continue;
            try {
                const buffer = fs.readFileSync(path.resolve(thumbnail));
                const fileExtension = thumbnail.split('.').pop();
                const key = `images/${catObj.category}/${slug}/thumbnail.${fileExtension}`;

                // Put the object
                await putImage({
                    key,
                    buffer
                });

                const fileURL = `https://s3.amazonaws.com/${bucket}/${key}`;

                // Replace the data in the meta.json object
                meta.thumbnail = fileURL;
                const metaPath = `pages/projects/${catObj.category}/${slug}/meta.json`;
                delete meta.slug;
                fs.writeJSONSync(path.resolve(metaPath), meta, {
                    spaces: 4,
                    replacer: null
                });
            } catch (err) {
                console.error('Could not read file', thumbnail);
            }
        }
    }
}

uploadThumbnails();