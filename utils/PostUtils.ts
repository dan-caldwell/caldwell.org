import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXSource } from './types';
import { ConfigCategory, sections } from '../config';
import marked from 'marked';
import dirTree from 'directory-tree';

export default class PostUtils {

    static getPostList = ({
        getHTML = false,
        getContent = false,
        flat = false,
        section = '',
    } = {}) => {

        const contentDir = sections[section].contentDir;

        const tree = dirTree(path.join(contentDir), { extensions: /\.mdx$/ });

        // Map through the structure tree and get metadata from each post
        const flatOutput = [];
        const mapTree = tree => {
            // Add label
            if (tree.path === contentDir) tree.label = sections[section].label;
            if (!tree.children) return;
            tree.children.forEach((child, index) => {
                if (child.name.endsWith('.mdx')) {
                    const slug = child.name.replace('.mdx', '');
                    // Get meta
                    const mdWithMeta = fs.readFileSync(path.join(child.path), 'utf8');
                    const { data: meta, content } = matter(mdWithMeta);
                    tree.children[index] = {
                        ...child,
                        ...meta,
                        html: getHTML ? marked(content) : null,
                        content: getContent ? content : null,
                        slug,
                    }
                    if (flat) flatOutput.push(tree.children[index]);
                }
                mapTree(child);
            });
            const cats = tree.children.filter((child: any) => !child.slug);
            const posts = tree.children.filter((child: any) => child.slug);
            // Sort the categories
            cats.sort((a: any, b: any) => {
                let aConfigIndex = sections[section].categories.findIndex((item: ConfigCategory) => item.name === a.name);
                let bConfigIndex = sections[section].categories.findIndex((item: ConfigCategory) => item.name === b.name);
                if (aConfigIndex === -1) aConfigIndex = Number.MAX_SAFE_INTEGER;
                if (bConfigIndex === -1) bConfigIndex = Number.MAX_SAFE_INTEGER;
                return aConfigIndex - bConfigIndex;
            });
            // Add appropriate metadata values to each category
            const mappedCats = cats.map((item: ConfigCategory) => {
                const configObj = sections[section].categories.find((cat: ConfigCategory) => cat.name === item.name);
                if (configObj) return {...item, ...configObj}
                return item;
            });
            // Sort the posts
            posts.sort((a: any, b: any) => {
                const aDate = new Date(a.date);
                const bDate = new Date(b.date);
                return bDate.getTime() - aDate.getTime();
            });
            // Prioritize posts, then categories, and swap tree.children
            tree.children = [...posts, ...mappedCats];
        }
        mapTree(tree);
        if (flat) return flatOutput;
        return tree;
    }

    static getMdxSource = async ({ slug, altPath }: MDXSource) => {
        const mdxWithMeta = fs.readFileSync(altPath || path.join(slug + '.mdx'), 'utf-8');
        const { content, data: meta } = matter(mdxWithMeta);
        return {
            source: await serialize(content, { scope: meta }),
            meta,
            content,
            mdxWithMeta
        }
    }

}