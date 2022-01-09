// This CLI will generate thumbnails from post images and automatically upload images from the public/images folder to S3
// It will then replace the post images with the new S3 URLs
import PostUtils from '../../utils/PostUtils';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import mime from 'mime-types';
import got from 'got';

export class HandleImages {

    // Get buffer info from image, push image info if the buffer exists
    static pushToImagesToBeUploaded = async ({ output, src, slug, filePath, isThumbnail, alt }) => {
        try {
            const isUrl = src.includes('http://') || src.includes('https://');
            const urlRes = isUrl ? await got(src, { responseType: 'buffer' }) : null;
            const buffer = isUrl ? urlRes.body : fs.readFileSync(path.join(__dirname, `../../public`, src));
            output.push({
                src,
                slug,
                buffer,
                mdFilePath: filePath,
                isThumbnail,
                alt
            });
        } catch (err) {
            console.log('Image file not found', src);
            console.log(err);
        }
    }

    // Loop through postList to find non-uploaded images
    static findNonUploadedImages = async ({ postList }) => {
        const output = [];
        for (const { html, slug, filePath, thumbnail } of postList) {
            // Use JSDOM to get all image elements
            const { document } = (new JSDOM(html)).window;
            const images = [...document.querySelectorAll('img')];
            // Check if we should add the thumbnail
            if (thumbnail && !thumbnail.includes('s3.amazonaws.com/caldwell.org')) {
                await this.pushToImagesToBeUploaded({
                    output,
                    src: thumbnail,
                    slug,
                    filePath,
                    isThumbnail: true,
                    alt: null
                });
            }
            const srcs = images.map(img => ({ src: img.src, alt: img.getAttribute('alt') }));
            for (const { src, alt } of srcs) {
                if (!src.includes('s3.amazonaws.com/caldwell.org')) {
                    await this.pushToImagesToBeUploaded({
                        output,
                        src,
                        slug,
                        filePath,
                        isThumbnail: false,
                        alt
                    });
                }
            }
        }
        return output;
    }

    // Create a thumbnail
    static createThumbnail = async ({ buffer, src }) => {
        try {
            return await sharp(buffer)
                .resize({
                    width: 150,
                    height: 150,
                    fit: sharp.fit.cover,
                    position: 'center',
                })
                .jpeg({
                    quality: 80
                })
                .flatten({ background: { r: 255, g: 255, b: 255 } })
                .toBuffer();
        } catch (err) {
            console.log('Could not resize thumbnail', src);
            console.log(err);
            return buffer;
        }
    }

    // Compress an image
    static compressImage = async ({ buffer, src }) => {
        try {
            const sharpObj = sharp(buffer);
            const meta = await sharpObj.metadata();
            // Do not compress gifs
            if (meta.format === "gif") return buffer;
            return await sharpObj.toFormat(meta.format, {
                quality: 80
            }).toBuffer();
        } catch (err) {
            console.log('Could not compress image', src);
            console.log(err);
            process.exit(1);
        }
    }

    // General conversion of image
    static convertImage = async ({ buffer, isThumbnail, src }) => {
        if (isThumbnail) {
            return await this.createThumbnail({ buffer, src });
        } else {
            return await this.compressImage({ buffer, src });
        }
    }

    // Rename a local file to a server file name
    static newFileName = ({ isThumbnail, extension = null, slug, alt = null, index = 0 }) => {
        const slugAlt = alt ? alt.replace(/ /g, '-').toLowerCase() : `image-${index + 1}`;
        const thumbnailName = `images/${slug}/thumbnail.jpg`;
        const standardName = `images/${slug}/${slugAlt}.${extension}`;
        return isThumbnail ? thumbnailName : standardName;
    }

    // Replace the original image src in the markdown file with the new src
    static replaceImageSrc = ({ mdFilePath, newSrc, oldSrc }) => {
        try {
            // Replace the local MDX file contents
            const mdFile = fs.readFileSync(mdFilePath, 'utf-8');
            const newImgUrl = `https://s3.amazonaws.com/caldwell.org/${newSrc}`;
            const newMdFileContents = mdFile.replace(oldSrc, newImgUrl);
            fs.writeFileSync(mdFilePath, newMdFileContents);
            console.log('Replaced image url in MD file', newImgUrl);
        } catch (err) {
            console.log('Error replacing image src', oldSrc);
            console.log(err);
        }
    }

    // Check if an object exists in S3
    static doesObjectExist = async ({ s3, key }) => {
        try {
            return await s3.getHeadObject({
                Bucket: process.env.AWS_CALDWELL_BUCKET,
                Key: key
            });
        } catch (err) {
            return false;
        }
    }

    // Put an image in S3
    static putImage = async ({ key, buffer }) => {
        try {
            // Upload the image
            await s3.putObject({
                Bucket: process.env.AWS_CALDWELL_BUCKET,
                Key: key,
                Body: buffer,
                ContentType: mime.lookup(key),
                ACL: 'public-read'
            }).promise();
            console.log('Uploaded image', key);
        } catch (err) {
            console.log('Error uploading image \n', key, err);
        }
    }

}

// S3 object
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

const handleImages = async ({
    section
}) => {
    const postList = PostUtils.getPostList({ getHTML: true, flat: true, section });
    const imagesToUpload = await HandleImages.findNonUploadedImages({ postList });
    for (const [index, { src, buffer, isThumbnail, mdFilePath, slug, alt }] of imagesToUpload.entries()) {
        const fileName = src.split('/').pop();
        const extension = fileName.split('.').pop();
        // Resize images, convert to png
        const newImageBuffer = await HandleImages.convertImage({ buffer, src, isThumbnail });
        // Rename image
        const newKey = HandleImages.newFileName({ isThumbnail, slug, extension, alt, index });
        // Save image to S3
        await HandleImages.putImage({ key: newKey, buffer: newImageBuffer });
        // Replace old srcs in MDX file with new srcs
        HandleImages.replaceImageSrc({ mdFilePath, newSrc: newKey, oldSrc: src });
    }
}

export default handleImages;