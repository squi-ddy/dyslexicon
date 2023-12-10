import { AddIcon } from "@chakra-ui/icons"
import {
    Divider,
    Flex,
    Heading,
    IconButton,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react"
import { useSize } from "@chakra-ui/react-use-size"
import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CustomTooltip } from "./CustomTooltip"
import { ForumCard } from "./ForumCard"
import { getForumContent } from "./util/api"
import { get } from "aws-amplify/api"

export function Forum() {
    const [forumContent, setForumContent] = useState<any[]>([])
    const cardIdealWidth = 500
    const VStackRef = useRef(null)
    const dims = useSize(VStackRef)
    const cardWidth = dims?.width
        ? Math.min(cardIdealWidth, dims.width)
        : cardIdealWidth

    useEffect(() => {
        async function setUserContent(): Promise<void> {
            const f = await getForumContent();
            setForumContent(f);
        }

        setUserContent();

    }, [forumContent]);

    async function triggerReload() {
        const forum = await getForumContent();
        setForumContent(Object.assign({}, forum))
    }

    // TODO: pagination

    return (
        <VStack ref={VStackRef} spacing={2} maxH={"full"}>
            <Flex w={"full"} justify={"space-between"}>
                <Heading textAlign={"center"}>Forum</Heading>
                <CustomTooltip label={"Make post"} placement={"left"}>
                    <IconButton
                        as={Link}
                        to={"new"}
                        float={"right"}
                        aria-label={"Make post"}
                        icon={<AddIcon boxSize={5} />}
                    ></IconButton>
                </CustomTooltip>
            </Flex>
            <Divider />
            <SimpleGrid
                columns={dims?.width ? Math.floor(dims.width / cardWidth) : 100}
                spacing={2}
                mt={4}
                overflowY={"scroll"}
            >
                {Object.entries(forumContent!).map(([id, content]) => (
                    <ForumCard
                        id={content.id}
                        content={content}
                        cardWidth={cardWidth}
                        limitHeight
                        triggerReload={triggerReload}
                        hasLink
                    />
                ))}
            </SimpleGrid>
        </VStack>
    )
}
