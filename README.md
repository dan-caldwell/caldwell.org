# Caldwell.org

[Go to site](http://caldwell.org.s3-website-us-east-1.amazonaws.com/)

## Scripts

These are the available scripts

### handle-images

To automatically upload images, you can either place the image in the public/images folder, or use a URL.
`yarn handle-images` will auto upload and replace the image URLs for you.

### compress-image

To compress an image from an s3 URL, you can use a command similar to this:

`yarn compress-image https://s3.amazonaws.com/caldwell.org/images/doodle-1.jpg --scale 0.5 --quality 80 --overwrite`

This command will scale by half and have 80% quality. It will also overwrite the old URL and upload the new image.

If you do not pass the `--overwrite` flag, the new image URL will include the dimensions of the new image: `https://s3.amazonaws.com/caldwell.org/images/doodle-1-1000x764-s0.5-q80.jpg`