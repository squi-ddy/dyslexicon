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
    content: UserContentData
}
