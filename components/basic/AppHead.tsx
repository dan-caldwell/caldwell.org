import Head from 'next/head';

const AppHead: React.FC<{
    title: string,
    overrideTitle?: boolean
}> = ({
    title = '',
    overrideTitle = false
}) => {

    const finalTitle = overrideTitle ? title : `${title} - Dan Caldwell`;

    return (
        <Head>
            <title>{finalTitle}</title>
        </Head>
    )
}

export default AppHead;