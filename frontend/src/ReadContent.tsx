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
    useToast,
} from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"
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
import { remove } from "aws-amplify/storage"
import { editUserContent, deleteUserContent, downloadAudio } from "./util/api"
import { ReadContentWord } from "./ReadContentWord"
import { GiOpenBook } from "react-icons/gi"

export function ReadContent() {
    const toast = useToast()
    const { contentId, content } = useLoaderData() as UserContentLoaderReturn // Works
    // content.align contains the alignment of the text
    const [time, setTime] = useState(0.0)
    let audioContext = new AudioContext()
    let audioBufferSourceNode = audioContext.createBufferSource()
    const align = JSON.parse(content.align)
    const navigate = useNavigate()
    const [playing, setPlaying] = useBoolean(false)
    const [editing, setEditing] = useBoolean(false)
    const [title, setTitle] = useState(content.title)
    const [body, setBody] = useState(content.content)
    const [newTitle, setNewTitle] = useState("")
    const [newBody, setNewBody] = useState("")
    const [processedBody, setProcessedBody] = useState([""])
    const [currentHighlightWord, setCurrentHighlightWord] = useState(0)
    const [currentWord, setCurrentWord] = useState(1)
    const [currentWordClicked, setCurrentWordClicked] = useState(false)
    const [lastWordIdx, setLastWordIdx] = useState(0)
    const [playingTimeout, setPlayingTimeout] = useState<number | undefined>(
        undefined
    )
    const [audio, setAudio] = useState<any>(null)

    let isMountRef = true

    useEffect(() => {
        async function setAudioContent(id: string): Promise<void> {
            const a = await downloadAudio(id)
            setAudio(a)
            console.log(a)
        }

        setAudioContent(content.audioID)
    }, [])

    useEffect(() => {
        console.log("Buffer")
        console.log(audioBufferSourceNode.buffer)
    }, [audioBufferSourceNode.buffer])
    useEffect(() => {
        const wordsOnly = body.split(/[^a-zA-Z0-9-]+/)
        while (wordsOnly[wordsOnly.length - 1] === "") {
            wordsOnly.pop()
        }
        const whitespaceOnly = body.split(/[a-zA-Z0-9-]+/)
        const processed = []
        for (
            let i = 0;
            i < Math.max(whitespaceOnly.length, wordsOnly.length);
            i++
        ) {
            if (i < whitespaceOnly.length) {
                processed.push(whitespaceOnly[i])
            }
            if (i < wordsOnly.length) {
                processed.push(wordsOnly[i])
                if (i === wordsOnly.length - 1) {
                    setLastWordIdx(processed.length - 1)
                }
            }
        }
        setProcessedBody(processed)
    }, [body])

    useEffect(() => {
        if (body !== content.content) {
            editUserContent(
                contentId,
                {
                    title,
                    body,
                },
                true,
                content.audioID
            )
        } else if (title !== content.title) {
            editUserContent(
                contentId,
                {
                    title,
                    body,
                },
                false,
                ""
            )
        }
    }, [setTitle, setBody, contentId])

    useEffect(() => {
        if (playing) {
            isMountRef = false
            audioBufferSourceNode.buffer = audio
            audioBufferSourceNode.connect(audioContext.destination)
            audioBufferSourceNode.start(time)
        } else {
            if (isMountRef) {
            } else {
                isMountRef = true
                // time = context.currentTime;
                audioBufferSourceNode.stop()
            }
        }
    }, [playing])

    useEffect(() => {
        if (playing) {
            let temp = (currentWord - 1) / 2
            let timeT =
                parseFloat(align[temp].end) - parseFloat(align[temp].begin)
            setCurrentWordClicked(false)
            setPlayingTimeout(
                setTimeout(() => {
                    const nextIdx = currentWord + 2
                    if (nextIdx <= lastWordIdx) {
                        setCurrentWord(nextIdx)
                        isMountRef = true
                    } else setPlaying.off()
                }, timeT * 1000)
            )
        } else {
            setTime(parseFloat(align[(currentWord - 1) / 2].begin))
            clearTimeout(playingTimeout)
        }
    }, [playing, currentWord, lastWordIdx, playingTimeout, setPlaying])

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
                                    setTitle(newTitle.trim())
                                    setBody(newBody.trim())
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
                                onClick={async () => {
                                    await deleteUserContent(
                                        contentId,
                                        content.audioID
                                    ).then(() => {
                                        navigate(-1)
                                    })
                                }}
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
                    onMouseDown={() => {
                        setCurrentWordClicked(false)
                    }}
                >
                    <Text
                        as={Box}
                        h={"full"}
                        w={"full"}
                        overflowY={"scroll"}
                        overflowX={"hidden"}
                        fontSize="2xl"
                        whiteSpace={"pre-wrap"}
                        display={"inline-block"}
                    >
                        {processedBody.map((text, idx) =>
                            idx % 2 === 1 ? (
                                <ReadContentWord
                                    word={text}
                                    idx={idx}
                                    highlighted={currentHighlightWord}
                                    selected={currentWord}
                                    clicked={currentWordClicked}
                                    triggerHighlight={setCurrentHighlightWord}
                                    triggerClick={(idx: number) => {
                                        setCurrentWord(idx)
                                        setCurrentWordClicked(true)
                                        setPlaying.off()
                                    }}
                                />
                            ) : (
                                text
                            )
                        )}
                    </Text>
                </Box>
            )}
            <Divider />
            <ButtonGroup isDisabled={editing}>
                <CustomTooltip label={"To Start"} placement={"top"}>
                    <IconButton
                        onClick={() => {
                            setCurrentWord(1)
                            setCurrentWordClicked(false)
                        }}
                        aria-label="To Start"
                        icon={<Icon as={GoMoveToStart} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <CustomTooltip label={"Back"} placement={"top"}>
                    <IconButton
                        onClick={() => {
                            setCurrentWordClicked(false)
                            const prevIdx = currentWord - 2
                            if (prevIdx >= 1) setCurrentWord(prevIdx)
                        }}
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
                        onClick={() => {
                            setCurrentWordClicked(false)
                            const nextIdx = currentWord + 2
                            if (nextIdx <= lastWordIdx) setCurrentWord(nextIdx)
                        }}
                        aria-label="Next"
                        icon={<Icon as={GoChevronRight} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <CustomTooltip label={"To End"} placement={"top"}>
                    <IconButton
                        onClick={() => {
                            setCurrentWord(lastWordIdx)
                            setCurrentWordClicked(false)
                        }}
                        aria-label="To End"
                        icon={<Icon as={GoMoveToEnd} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <CustomTooltip label={"Quiz yourself"} placement={"top"}>
                    <IconButton
                        onClick={() => {
                            alert("not implemented")
                        }}
                        aria-label="Quiz yourself"
                        icon={<Icon as={GiOpenBook} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
            </ButtonGroup>
        </VStack>
    )
}
