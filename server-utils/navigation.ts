import fs from 'fs-extra';
import path from 'path';

export type NavigationProps = {
    category: string,
    projects: ProjectMeta[]
}

export type ProjectMeta = {
    slug: string,
    title?: string,
    date?: string
}

export type PageNavProps = {
    postList: NavigationProps[]
}

// Get the list of posts
export const getPostList = () => {
    const projectCategories = fs.readdirSync(path.join('pages/projects'));
    return projectCategories.map(category => {
        const catProjects = fs.readdirSync(path.join(`pages/projects/${category}`));
        const withMeta = catProjects.map(project => {
            try {
                const meta = JSON.parse(fs.readFileSync(`pages/projects/${category}/${project}/meta.json`).toString());
                return {
                    slug: project,
                    ...meta
                }
            } catch (err) {
                return {
                    slug: project
                }
            }
        });
        return {
            category,
            projects: withMeta
        }
    });
}