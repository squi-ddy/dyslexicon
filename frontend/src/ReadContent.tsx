import { useLoaderData } from "react-router-dom"
import { UserContentLoaderReturn } from "./util/types"

export function ReadContent() {
    const { contentId, content } = useLoaderData() as UserContentLoaderReturn

    return (
        <div>
            {contentId}
            {content.title}
        </div>
    )
}
