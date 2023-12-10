import { Params } from "react-router-dom"
import {
    doAutoSignIn,
    getForumContentById,
    getUserContentById,
    isLoggedIn,
} from "./api"
import { ForumContentLoaderReturn, UserContentLoaderReturn } from "./types"

export async function userContentLoader(data: {
    params: Params<string>
}): Promise<UserContentLoaderReturn> {
    const contentId = data.params.contentId!
    const content = await getUserContentById(contentId)!
    return { contentId, content }
}

export async function forumContentLoader(data: {
    params: Params<string>
}): Promise<ForumContentLoaderReturn> {
    const contentId = data.params.contentId!
    const content = await getForumContentById(contentId)!
    return { contentId, content }
}

export async function homeContentLoader(): Promise<boolean> {
    if (!(await doAutoSignIn())) {
        return false
    }
    if (!isLoggedIn()) {
        return false
    }
    return true
}
