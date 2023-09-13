import { UserContentData } from "./types"

const userContent: { [id: string]: UserContentData } = {
    "1293": {
        title: "Lorem Ipsum",
        content: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz\nhi",
    },
    "2977": {
        title: "Test",
        content: "The\nquick\nbrown\nfox\njumps\nover\nthe\nlazy\ndog",
    },
}

export function getUserContent() {
    return userContent
}
export function getUserContentById(id: string) {
    return userContent[id]
}
