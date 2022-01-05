import StandardWithTitle from '../../../../components/layouts/StandardWithTitle';
import Contain from '../../../../components/utilities/Contain';
import Slideshow from '../../../../components/slideshow/Slideshow';
import Image from '../../../../components/content/Image';
import meta from './meta.json';

export default function Index() {
    return (
        <StandardWithTitle title={meta.title}>
            <Slideshow height={500}>
                <Contain>
                    <Image
                        className="float-left mr-4"
                        src="https://s3.amazonaws.com/caldwell.info/images/religion-news-service-website-redesign/rns-home-mobile-dec-2021-800x1732-s1-q90.png"
                    />
                    <p>
                        I rebuilt and redesigned the entire ReligionNews.com frontend. ReligionNews.com gets over 2 million page views a month, so we needed a fast, highly SEO optimized site. The new frontend’s page speed is 2x faster than the previous site and SEO has been improved 15% — helping to double our Alexa ranking. The new site also has many UX improvements.
                    </p>
                </Contain>
                <Contain>
                    <Image 
                        src="https://s3.amazonaws.com/caldwell.info/images/religion-news-service-website-redesign/rns-home-desktop-dec-2021-800x743-s1-q90.png" 
                        caption="Desktop home page"
                    />
                </Contain>
                <Contain>
                    <Image
                        src="https://s3.amazonaws.com/caldwell.info/images/religion-news-service-website-redesign/rns-post-desktop-dec-2021-800x743-s1-q90.png"
                        caption="Post page"
                    />
                </Contain>
                <Contain>
                    <Image
                        src="https://s3.amazonaws.com/caldwell.info/images/religion-news-service-website-redesign/rns-category-desktop-dec-2021-800x743-s1-q90.png"
                        caption="Category page"
                    />
                </Contain>
                <Contain>
                    <Image
                        src="https://s3.amazonaws.com/caldwell.info/images/religion-news-service-website-redesign/rns-gallery-dec-2021-2-800x571-s1-q90.png"
                        caption="Photo gallery"
                    />
                </Contain>
                <div>
                    <h1>New Features</h1>
                    <ul>
                        <li>Reading progress - a sidebar widget that counts how many of today&apos;s popular posts a user a read.</li>
                        <li>Dynamic lazy loading based on device.</li>
                        <li>Trending topic area – when there are important news events, a trending topic area appears on the home page.</li>
                        <li>RNS Photo galleries - large, beautiful, and fully customizable galleries for photo based stories.</li>
                        <li>An analytics backend tool to load calculate e-commerce order averages.</li>
                        <li>Crop featured image functionality to re-position thumbnails.</li>
                        <li>Featured video on posts.</li>
                        <li>A pop-up video modal for sponsored posts.</li>
                        <li>Google Page View Insights score on average improved from 10-25 point range to 50-90 point range.</li>
                        <li>RNS Forms to accept payments, create subscriptions, make posts, generate downloads, and sign users up for newsletters.</li>
                        <li>And many other small UX improvements.</li>
                    </ul>
                </div>
            </Slideshow>
        </StandardWithTitle>
    )
}