import { ForumCommentData, ForumContentData, UserContentData } from "./types"
import helloUrl from "/hello.mp3"
import hello2Url from "/hello2.mp3"

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

const forumContent: { [id: string]: ForumContentData } = {
    "1": {
        title: "Help me with pronunciation",
        by: "user1",
        body: "I'm having trouble with the pronunciation of the word 'hello'. Can someone help me?",
        comments: [
            {
                body: "I think it should be like this:",
                by: "user2",
                audio: hello2Url,
            },
        ],
        audio: helloUrl,
    },
    "2": {
        title: "Hi!",
        by: "user2",
        body: "Hi everyone! I'm new here. Nice to meet you all!",
        comments: [
            {
                body: "Hi!",
                by: "user3",
            },
            {
                body: "Welcome!",
                by: "user4",
            },
        ],
    },
}

export function getForumContent() {
    return forumContent
}

export function getUserContent() {
    return userContent
}

export function getUserContentById(id: string) {
    return userContent[id]
}

export function getForumContentById(id: string) {
    return forumContent[id]
}

export function addComment(contentId: string, comment: ForumCommentData) {
    forumContent[contentId].comments.push(comment)
}

export function getLoggedInUser() {
    return "johndoe"
}
