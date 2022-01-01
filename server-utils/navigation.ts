import fs from 'fs-extra';
import path from 'path';

export type NavigationProps = {
    category: string,
    projects: string[]
}

export type PageNavProps = {
    postList: NavigationProps[]
}

// Get the list of posts
export const getPostList = () => {
    const projectCategories = fs.readdirSync(path.join('pages/projects'));
    return projectCategories.map(category => {
        const catProjects = fs.readdirSync(path.join(`pages/projects/${category}`));
        return {
            category,
            projects: catProjects
        }
    });
}