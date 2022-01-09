// This script script takes an S3 image URL, compresses the image, and then replaces the old image
import AWS from 'aws-sdk';
import sharp from 'sharp';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import mime from 'mime-types';
import chalk from 'chalk';

const argv = yargs(hideBin(process.argv)).argv;

// S3 object
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

const formatBytes = (bytes: number, decimals = 3) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Put an image in S3
const putImage = async ({ key, buffer }) => {
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

const compress = async ({ buffer, quality, scale, width, height }) => {
    try {
        const meta = await sharp(buffer).metadata();

        let newWidth = Math.round(scale * meta.width);
        let newHeight = Math.round(scale * meta.height);

        if (width && !height) {
            newWidth = width;
            newHeight = Math.round((width / meta.width) * meta.height);
        }
        if (height && !width) {
            newWidth = Math.round((height / meta.height) * meta.width);
            newHeight = height;
        }
        
        const newBuffer =
            await sharp(buffer)
                .toFormat(meta.format, { quality })
                .resize(newWidth, newHeight)
                .toBuffer();
        const newMeta = await sharp(newBuffer).metadata();
        console.log(`Resized image from [${meta.width}x${meta.height}] to [${newMeta.width}x${newMeta.height}]`)
        console.log(`Compressed image from ${formatBytes(meta.size)} to ${formatBytes(newMeta.size)}`);
        return {
            buffer: newBuffer,
            meta: newMeta
        };
    } catch (err) {
        console.log('Could not compress image');
        console.log(err);
        process.exit(1);
    }
}

const createNewKey = ({ key, argv, meta }) => {
    const extension = key.split('/').pop().split('.').pop();
    const keyNoExtension = key.replace('.' + extension, '');
    const scaleKey = argv.scale ? `-s${argv.scale}` : `-s1`;
    const qualityKey = argv.quality ? `-q${argv.quality}` : `-q100`;
    return argv.overwrite ? key : 
        `${keyNoExtension}-${meta.width}x${meta.height}${scaleKey}${qualityKey}.${extension}`;
}

const init = async () => {
    try {
        const inputUrl = argv._.find(item => typeof item === "string" && item.includes('https://s3.amazonaws.com'))?.toString();
        if (!inputUrl) return console.log('Could not find an input url');
        // Get the key
        const key = inputUrl.replace(`https://s3.amazonaws.com/${process.env.AWS_CALDWELL_BUCKET}/`, '');
        const s3Obj = await s3.getObject({
            Key: key,
            Bucket: process.env.AWS_CALDWELL_BUCKET
        }).promise();
        const buffer = s3Obj.Body;
        const { buffer: newBuffer, meta } = await compress({
            buffer,
            scale: argv.scale || 1,
            width: argv.width || null,
            height: argv.height || null,
            quality: argv.quality || 100
        });
        const newKey = createNewKey({ key, argv, meta });
        await putImage({
            key: newKey,
            buffer: newBuffer
        });
        console.log('New image URL', chalk.greenBright(`https://s3.amazonaws.com/${process.env.AWS_CALDWELL_BUCKET}/${newKey}`));
    } catch (err) {
        console.log(err);
    }

}

export default init;
