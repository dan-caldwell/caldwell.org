export type MDXSource = {
    slug: string,
    altPath?: string
}

export type PostMeta = {
    slug: string,
    title?: string,
    date?: string,
    excerpt?: string
    thumbnail?: string
    html?: string
    content?: string,
    filePath: string,
    path?: string
}