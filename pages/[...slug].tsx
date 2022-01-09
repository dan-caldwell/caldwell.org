import React, { useContext, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import YouTube from '../components/content/YouTubeWrap';
import PostUtils from '../utils/PostUtils';
import { PostContext } from '../components/context/PostContext';
import ContentContainer from '../components/ContentContainer';
import Image from '../components/basic/Image';
import SpinScroll from '../components/scroll/spinScroll';
import TitleCard from '../components/cards/TitleCard';
import PrintPageContainer from '../components/content/PrintPageContainer';
import Md from '../components/content/Md';
import Header from '../components/text/Header';
import Anchor from '../components/basic/Anchor';
import { PostMeta } from '../utils/types';
import { sections } from '../config';
import Head from 'next/head';

const mdxComponents = {
    YouTube,
    Image,
    SpinScroll,
    TitleCard,
    PrintPageContainer,
    Md,
    Anchor
}

export const getStaticPaths = async () => {
    
    const allPaths = [];
    for (const section in sections) {
        const postList = PostUtils.getPostList({
            flat: true,
            section
        });
        const paths = (postList as PostMeta[]).map(post => ({
            params: {
                slug: post.path.replace('.mdx', '').split('/')
            }
        }));
        allPaths.push(...paths);
    }

    return { paths: allPaths, fallback: false }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const { source, meta } = await PostUtils.getMdxSource({ slug: slug.join('/') });

    return {
        props: {
            source,
            meta,
            slug,
        }
    }
}

const Post = ({ source, meta: { title, layout }, slug }) => {
    const { setCurrentPost, setOpenSection } = useContext(PostContext);

    useEffect(() => {
        setCurrentPost(slug.join('/'));
        setOpenSection(slug[0]);
        return () => setCurrentPost(null);
    }, [setCurrentPost, setOpenSection, slug]);

    return (
        <ContentContainer layout={layout}>
            <Head>
                <title>{title} - Dan Caldwell</title>
            </Head>
            <Header title={title} />
            <MDXRemote {...source} components={mdxComponents} />
        </ContentContainer>
    );
}
export default Post;