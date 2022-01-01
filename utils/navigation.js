const fs = require('fs-extra');
const path = require('path');

// Get the list of posts
const getPostList = () => {
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

module.exports = {
    getPostList
}