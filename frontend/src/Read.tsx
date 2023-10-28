import {
    Box,
    Divider,
    SimpleGrid,
    Heading,
    VStack,
    Card,
    CardHeader,
    CardBody,
    Text,
    Flex,
    IconButton,
} from "@chakra-ui/react"
import { useSize } from "@chakra-ui/react-use-size"
import { Link } from "react-router-dom"
import { getUserContent } from "./util/api"
import { CustomTooltip } from "./CustomTooltip"
import { AddIcon } from "@chakra-ui/icons"
import { useRef } from "react"

export function HomeRead() {
    const userContent = getUserContent()
    const cardIdealWidth = 250
    const cardAspectRatio = 1
    const VStackRef = useRef(null)
    const dims = useSize(VStackRef)
    const cardWidth = dims?.width
        ? Math.min(cardIdealWidth, dims.width)
        : cardIdealWidth

    // TODO: pagination

    return (
        <VStack ref={VStackRef} spacing={4} maxH={"full"}>
            <Flex w={"full"} justify={"space-between"}>
                <Heading textAlign={"center"}>Your content</Heading>
                <CustomTooltip
                    label={"Add or generate text"}
                    placement={"left"}
                >
                    <IconButton
                        as={Link}
                        to={"new"}
                        float={"right"}
                        aria-label={"add"}
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
                {Object.entries(userContent).map(([id, content]) => (
                    <Card
                        key={id}
                        as={Link}
                        to={id}
                        width={cardWidth + "px"}
                        height={cardWidth * cardAspectRatio + "px"}
                        variant="clickable-card"
                    >
                        <CardHeader>
                            <Heading size={"md"} noOfLines={1}>
                                {content.title}
                            </Heading>
                        </CardHeader>
                        <CardBody minH={0}>
                            <Box
                                borderWidth={1}
                                borderColor={"themeColors.accent1"}
                                borderRadius={"sm"}
                                p={2}
                                h={"full"}
                            >
                                <Text
                                    fontSize="sm"
                                    whiteSpace={"pre-wrap"}
                                    overflow={"hidden"}
                                    maxH={"full"}
                                >
                                    {content.body}
                                </Text>
                            </Box>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </VStack>
    )
}