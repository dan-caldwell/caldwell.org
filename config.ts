export type ConfigCategory = {
    title: string,
    name: string,
}

export type ConfigSection = {
    contentDir: string;
    categories: ConfigCategory[]
}

export const projectsDir = 'post';
export const postProperties = {
    // Metadata about categories
    categories: [
        {
            title: 'Code',
            name: 'code'
        },
        {
            title: 'Art',
            name: 'art'
        },
    ]
}

export const sections = {
    projects: {
        contentDir: 'post',
        label: 'Projects',
        categories: [
            {
                title: 'Code',
                name: 'code'
            },
            {
                title: 'Art',
                name: 'art'
            },
        ]
    },
    blog: {
        contentDir: 'blog',
        label: 'Blog',
        categories: [
            {
                title: 'Life',
                name: 'life'
            }
        ]
    }
}