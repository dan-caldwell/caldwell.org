import AWS from 'aws-sdk';
import mime from 'mime-types';

export const bucket = process.env.AWS_CALDWELL_BUCKET;

// S3 object
export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Put an image in S3
export const putImage = async ({ key, buffer }) => {
    try {
        // Upload the image
        await s3.putObject({
            Bucket: bucket,
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