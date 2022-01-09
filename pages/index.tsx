import Head from 'next/head';
import { useContext, useEffect } from 'react';
import AppHead from '../components/basic/AppHead';
import ContentContainer from '../components/ContentContainer';
import { PostContext } from '../components/context/PostContext';

export default function IndexPage() {
    const { setCurrentPost } = useContext(PostContext);

    useEffect(() => {
        setCurrentPost('home');
        return () => setCurrentPost(null);
    }, [setCurrentPost]);

    return (
        <>
            <AppHead title="Dan Caldwell - Software Engineer" overrideTitle />
            <ContentContainer className="items-center w-container">
                <h1 className="text-3xl font-bold leading-9 pb-8 mb-0 leading-none">
                    Hello — my name is Dan Caldwell. I’m a software engineer. This is a selection of my personal and professional work.
                </h1>
                <div className="w-full overflow-hidden">
                    <img className="w-full h-full object-contain" src="https://s3.amazonaws.com/caldwell.info/images/doodle-1-1000x764-s0.5-q100.jpg" alt="large doodle" loading="lazy" />
                </div>
            </ContentContainer>
        </>
    );
}