export type HomeNav = {
    name: string
    path: string
    tooltip: string
}

export type UserContentData = {
    title: string
    content: string
}

export type UserContentLoaderReturn = {
    contentId: string
    content: UserContentData
}
