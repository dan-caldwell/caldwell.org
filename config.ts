export type ConfigCategory = {
    title: string,
    name: string,
}

export type ConfigSection = {
    contentDir: string;
    categories: ConfigCategory[]
}

export const bucket = 'caldwell.org';

export const sections = {
    projects: {
        contentDir: 'projects',
        label: 'Projects',
        categories: [
            {
                title: 'Code',
                name: 'code'
            },
            {
                title: 'Video',
                name: 'video'
            },
            {
                title: 'Art',
                name: 'art'
            },
        ]
    },
}