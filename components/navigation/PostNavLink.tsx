import Link from 'next/link';
import { ProjectMeta } from '../../utils/types';
import Thumbnail from './Thumbnail';

type Props = {
    activePath: string;
    category: string;
    meta: ProjectMeta;
    paddingLeft?: number;
}

const PostNavLink: React.FC<Props> = ({
    activePath,
    category,
    paddingLeft = 2,
    meta: {
        slug,
        thumbnail_bg,
        thumbnail,
        thumbnail_padding,
        title
    }
}) => {

    const href = `/projects/${category}/${slug}`;
    const linkClassName = [
        'flex p-2',
        `pl-${paddingLeft}`
    ].join(' ');

    const containerClassName = [
        'PostNavLink border-b border-slate-200 last:border-b-0',
        activePath === href ? 'bg-purple-100 hover:bg-purple-100' : 'hover:bg-purple-50'
    ].join(' ');

    const titleClassName = [
        'PostNavLink--title text-sm',
        thumbnail ? 'ml-2' : '',
    ].join(' ');

    return (
        <div className={containerClassName}>
            <Link key={slug} prefetch={false} href={href}>
                <a className={linkClassName}>
                    {thumbnail && 
                        <Thumbnail 
                            src={thumbnail} 
                            bg={thumbnail_bg}
                            thumbnailPadding={thumbnail_padding}
                        />
                    }
                    <div className={titleClassName}>
                        {title || slug}
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default PostNavLink;