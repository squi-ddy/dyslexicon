import { Params } from "react-router-dom"
import { getUserContentById } from "./api"
import { UserContentLoaderReturn } from "./types"

export async function userContentLoader(data: {
    params: Params<string>
}): Promise<UserContentLoaderReturn> {
    const contentId = data.params.contentId!
    return { contentId, content: getUserContentById(contentId) }
}
