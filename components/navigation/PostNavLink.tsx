import Link from 'next/link';
import Thumbnail from './Thumbnail';

type Props = {
    activePath: string;
    slug: string;
    category: string;
    title: string;
    thumbnail?: string;
    thumbnailBg?: string;
}

const PostNavLink: React.FC<Props> = ({
    activePath,
    slug,
    category,
    title,
    thumbnail,
    thumbnailBg
}) => {

    const href = `/projects/${category}/${slug}`;
    const linkClassName = [
        'flex',
        activePath === href ? 'bg-red-500' : ''
    ].join(' ');

    return (
        <div>
            <Link key={slug} prefetch={false} href={href}>
                <a className={linkClassName}>
                    {thumbnail && <Thumbnail src={thumbnail} bg={thumbnailBg} />}
                    <div>
                        {title || slug}
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default PostNavLink;