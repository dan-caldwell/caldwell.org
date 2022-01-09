import { HandleImages } from '../scripts/handle-images/handle-images';
import PostUtils from '../utils/PostUtils';

test("convertImage", async () => {
    const postList = PostUtils.getPostList({ getHTML: true, flat: true, section: 'projects' });
    const imagesToUpload = await HandleImages.findNonUploadedImages({ postList });
    for (const { src, buffer, isThumbnail, mdFilePath, slug } of imagesToUpload) {
        // Resize images, convert to jpg
        await HandleImages.convertImage({ buffer, src, isThumbnail });
    }
});

test("newFileName", () => {

    const newThumbnailName = HandleImages.newFileName({ 
        alt: null,
        isThumbnail: true, 
        slug: 'ultracss',
        extension: 'png'
    });

    expect(newThumbnailName).toEqual(`images/ultracss/thumbnail.jpg`);

    const newImageName = HandleImages.newFileName({ 
        alt: null,
        index: 3,
        isThumbnail: false,
        slug: 'ultracss',
        extension: 'png'
    });

    expect(newImageName).toEqual('images/ultracss/image-4.png');

    const newUrlImageName = HandleImages.newFileName({
        alt: 'RNS Desktop Home Page',
        isThumbnail: false,
        slug: 'religion-news-service-website-redesign',
        extension: 'gif'
    });

    expect(newUrlImageName).toEqual('images/religion-news-service-website-redesign/rns-desktop-home-page.gif');
});