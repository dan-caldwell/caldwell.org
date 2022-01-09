// Generates a JSON file of the list of posts
import fs from 'fs-extra';
import path from 'path';
import PostUtils from "../../utils/PostUtils";
import { sections } from '../../config';

for (const section in sections) {
    const postList = PostUtils.getPostList({
        section
    });
    const location = path.join(__dirname, `../../json/${section}-post-list.json`);
    fs.ensureFileSync(location);
    fs.writeJson(location, JSON.stringify(postList));
    console.log('Created static post list for', section);
}

