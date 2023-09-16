import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
    Box,
    ButtonGroup,
    Divider,
    Flex,
    Heading,
    Icon,
    IconButton,
    Input,
    Text,
    Textarea,
    VStack,
    useBoolean,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsPause, BsPlay } from "react-icons/bs"
import {
    GoCheck,
    GoChevronLeft,
    GoChevronRight,
    GoMoveToEnd,
    GoMoveToStart,
    GoX,
} from "react-icons/go"
import { useLoaderData, useNavigate } from "react-router-dom"
import { CustomTooltip } from "./CustomTooltip"
import { UserContentLoaderReturn } from "./util/types"

export function ReadContent() {
    const { content } = useLoaderData() as UserContentLoaderReturn
    const navigate = useNavigate()
    const [playing, setPlaying] = useBoolean(false)
    const [editing, setEditing] = useBoolean(false)
    const [title, setTitle] = useState(content.title)
    const [body, setBody] = useState(content.body)
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")

    useEffect(() => {
        // todo: api stuff when they change
    }, [title, body])

    return (
        <VStack w={"full"} h={"full"} spacing={2}>
            <Flex w={"full"} justify={"space-between"} align={"center"}>
                <Flex align={"center"} gap={3}>
                    {editing ? (
                        <Input
                            fontSize={"2xl"}
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    ) : (
                        <>
                            <CustomTooltip label={"Back"} placement={"right"}>
                                <IconButton
                                    onClick={() => navigate(-1)}
                                    aria-label="Back"
                                    icon={<ArrowBackIcon boxSize={7} />}
                                ></IconButton>
                            </CustomTooltip>
                            <Heading textAlign={"center"}>{title}</Heading>
                        </>
                    )}
                </Flex>
                {editing ? (
                    <ButtonGroup>
                        <CustomTooltip
                            label={"Accept changes"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={() => {
                                    setTitle(newTitle)
                                    setBody(newBody)
                                    setEditing.off()
                                }}
                                aria-label="Accept changes"
                                icon={<Icon as={GoCheck} boxSize={7} />}
                            ></IconButton>
                        </CustomTooltip>
                        <CustomTooltip
                            label={"Discard changes"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={setEditing.off}
                                aria-label="Discard changes"
                                icon={<Icon as={GoX} boxSize={7} />}
                            ></IconButton>
                        </CustomTooltip>
                    </ButtonGroup>
                ) : (
                    <ButtonGroup>
                        <CustomTooltip label={"Edit text"} placement={"bottom"}>
                            <IconButton
                                onClick={() => {
                                    setNewTitle(title)
                                    setNewBody(body)
                                    setEditing.on()
                                }}
                                aria-label="Edit text"
                                icon={<EditIcon boxSize={5} />}
                            ></IconButton>
                        </CustomTooltip>
                        <CustomTooltip
                            label={"Delete text"}
                            placement={"bottom"}
                        >
                            <IconButton
                                aria-label="Delete text"
                                icon={<DeleteIcon boxSize={5} />}
                            ></IconButton>
                        </CustomTooltip>
                    </ButtonGroup>
                )}
            </Flex>
            <Divider />

            {editing ? (
                <Textarea
                    h={"full"}
                    overflowY={"scroll"}
                    fontSize="2xl"
                    whiteSpace={"pre-wrap"}
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                />
            ) : (
                <Box
                    w={"full"}
                    flexGrow={1}
                    p={4}
                    minH={0}
                    borderWidth={2}
                    borderRadius={"md"}
                    borderColor={"themeColors.accent1"}
                >
                    <Text
                        h={"full"}
                        overflowY={"scroll"}
                        fontSize="2xl"
                        whiteSpace={"pre-wrap"}
                    >
                        {body}
                    </Text>
                </Box>
            )}
            <Divider />
            <ButtonGroup isDisabled={editing}>
                <CustomTooltip label={"To Start"} placement={"top"}>
                    <IconButton
                        onClick={() => {}}
                        aria-label="To Start"
                        icon={<Icon as={GoMoveToStart} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <CustomTooltip label={"Back"} placement={"top"}>
                    <IconButton
                        onClick={() => {}}
                        aria-label="Back"
                        icon={<Icon as={GoChevronLeft} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <CustomTooltip
                    label={playing ? "Pause" : "Play"}
                    placement={"top"}
                >
                    <IconButton
                        onClick={setPlaying.toggle}
                        aria-label={playing ? "Pause" : "Play"}
                        icon={
                            <Icon as={playing ? BsPause : BsPlay} boxSize={7} />
                        }
                    ></IconButton>
                </CustomTooltip>
                <CustomTooltip label={"Next"} placement={"top"}>
                    <IconButton
                        onClick={() => {}}
                        aria-label="Next"
                        icon={<Icon as={GoChevronRight} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <CustomTooltip label={"To End"} placement={"top"}>
                    <IconButton
                        onClick={() => {}}
                        aria-label="To End"
                        icon={<Icon as={GoMoveToEnd} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
            </ButtonGroup>
        </VStack>
    )
}
