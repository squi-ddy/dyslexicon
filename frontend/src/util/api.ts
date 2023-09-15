import { UserContentData } from "./types"

// TODO: use firestore

const userContent: { [id: string]: UserContentData } = {
    "1293": {
        title: "Lorem Ipsum",
        body: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz\nhi",
    },
    "2977": {
        title: "Test",
        body: "The\nquick\nbrown\nfox\njumps\nover\nthe\nlazy\ndog",
    },
}

export function getUserContent() {
    return userContent
}

export function getUserContentById(id: string) {
    return userContent[id]
}
