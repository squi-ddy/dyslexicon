import { Params } from "react-router-dom"
import { getForumContentById, getUserContentById } from "./api"
import { ForumContentLoaderReturn, UserContentLoaderReturn } from "./types"

export async function userContentLoader(data: {
    params: Params<string>
}): Promise<UserContentLoaderReturn> {
    const contentId = data.params.contentId!
    return { contentId, content: getUserContentById(contentId) }
}

export async function forumContentLoader(data: {
    params: Params<string>
}): Promise<ForumContentLoaderReturn> {
    const contentId = data.params.contentId!
    return { contentId, content: getForumContentById(contentId) }
}
