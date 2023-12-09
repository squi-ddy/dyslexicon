export type HomeNav = {
    name: string
    path: string
    tooltip: string
}

export type UserContentData = {
    title: string
    body: string
}

export type UserContentLoaderReturn = {
    contentId: string
    content: any
}

export type ForumContentLoaderReturn = {
    contentId: string
    content: any
}

export type ForumContentData = {
    title: string
    by: string
    body: string
    audio?: string
    comments: ForumCommentData[]
}

export type ForumCommentData = {
    by: string
    body: string
    audio?: string
}
