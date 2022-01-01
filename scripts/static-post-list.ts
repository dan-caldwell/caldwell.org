// Generates a JSON file of the list of posts
import fs from 'fs-extra';
import path from 'path';
import { getPostList } from '../utils/navigation';

const postList = getPostList();
const location = path.join(__dirname, '../json/post-list.json');
fs.ensureFileSync(location);
fs.writeJson(location, JSON.stringify(postList));
console.log('Created static post list');