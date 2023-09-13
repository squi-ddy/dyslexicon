import { useLoaderData, useNavigate } from "react-router-dom"
import { UserContentLoaderReturn } from "./util/types"
import {
    Box,
    Flex,
    Heading,
    IconButton,
    VStack,
    ButtonGroup,
    Divider,
} from "@chakra-ui/react"
import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { CustomTooltip } from "./CustomTooltip"

export function ReadContent() {
    const { content } = useLoaderData() as UserContentLoaderReturn
    const navigate = useNavigate()

    return (
        <VStack w={"full"} h={"full"} spacing={2}>
            <Flex w={"full"} justify={"space-between"} align={"center"}>
                <Flex align={"center"} gap={3}>
                    <CustomTooltip label={"Back"} placement={"right"}>
                        <IconButton
                            onClick={() => navigate(-1)}
                            aria-label="Back"
                            icon={<ArrowBackIcon boxSize={7} />}
                        ></IconButton>
                    </CustomTooltip>
                    <Heading textAlign={"center"}>{content.title}</Heading>
                </Flex>
                <ButtonGroup>
                    <CustomTooltip label={"Edit text"} placement={"bottom"}>
                        <IconButton
                            aria-label="Edit text"
                            icon={<EditIcon boxSize={5} />}
                        ></IconButton>
                    </CustomTooltip>
                    <CustomTooltip label={"Delete text"} placement={"bottom"}>
                        <IconButton
                            aria-label="Delete text"
                            icon={<DeleteIcon boxSize={5} />}
                        ></IconButton>
                    </CustomTooltip>
                </ButtonGroup>
            </Flex>
            <Divider />
            <Box
                w={"full"}
                flexGrow={1}
                p={2}
                borderWidth={2}
                borderRadius={"md"}
                borderColor={"themeColors.accent1"}
            >
                a
            </Box>
        </VStack>
    )
}
