import { ArrowBackIcon } from "@chakra-ui/icons"
import { Divider, HStack, Heading, IconButton, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { CustomTooltip } from "./CustomTooltip"
import { ForumCard } from "./ForumCard"
import { getForumContentById } from "./util/api"
import { ForumContentLoaderReturn } from "./util/types"

export function ForumContent() {
    const { contentId, content } = useLoaderData() as ForumContentLoaderReturn
    const [currentContent, setCurrentContent] = useState(content)
    const navigate = useNavigate()

    async function triggerReload() {
        await getForumContentById(contentId).then((update) => {
            setCurrentContent(Object.assign({}, update))})
    }

    return (
        <VStack w={"full"} h={"full"} spacing={2}>
            <HStack align={"center"} spacing={3} w={"full"}>
                <CustomTooltip label={"Back"} placement={"right"}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        aria-label="Back"
                        icon={<ArrowBackIcon boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <Heading textAlign={"center"}>Forum Post</Heading>
            </HStack>
            <Divider />
            <ForumCard
                styleProps={{ overflowY: "hidden" }}
                cardWidth={"full"}
                content={currentContent}
                id={contentId}
                frontPage={false}
                triggerReload={triggerReload}
            ></ForumCard>
        </VStack>
    )
}
