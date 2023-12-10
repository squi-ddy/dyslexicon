import { CloseIcon, Icon } from "@chakra-ui/icons"
import {
    Divider,
    HStack,
    Heading,
    IconButton,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BsCheck2 } from "react-icons/bs"
import {
    HiOutlineQuestionMarkCircle,
    HiOutlineSpeakerWave,
} from "react-icons/hi2"
import { CustomTooltip } from "./CustomTooltip"
import {
    getNextReviseWord,
    reviseFailure,
    reviseSuccess,
    currentWordAudio,
    getRevisionCardsByUserId,
    SyncRevisionCards,
} from "./util/api"

export function Revise() {
    const [flashcard, setFlashcard] = useState(getNextReviseWord())

    useEffect(() => {
        console.log("SYNCED")
        async function sync() {
            try {
                await SyncRevisionCards()
                setFlashcard(getNextReviseWord())
            } catch (error) {
                console.log(error)
            }
        }
        sync()
    }, [])

    const playAudio = async () => {
        try {
            const base64Audio = await currentWordAudio()
            if (base64Audio) {
                const audio = new Audio()
                audio.src = `data:audio/wav;base64,${base64Audio}`
                console.log(audio.src)
                audio.play()
            } else {
                console.error("Error fetching audio")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <VStack w={"full"} h={"full"} spacing={2}>
            <HStack align={"center"} spacing={3} w={"full"}>
                <Heading textAlign={"center"}>Flashcards</Heading>
            </HStack>
            <Divider />
            {flashcard ? (
                <VStack
                    flexGrow={1}
                    borderWidth={2}
                    borderColor={"themeColors.accent1"}
                    borderRadius={"md"}
                    w={"full"}
                    p={2}
                    spacing={2}
                >
                    <HStack flexGrow={1}>
                        <Text fontSize={["3xl", "5xl", "9xl"]}>
                            {flashcard}
                        </Text>
                    </HStack>
                    <HStack>
                        <CustomTooltip
                            label={"Understood"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={() => {
                                    reviseSuccess()
                                    setFlashcard(getNextReviseWord())
                                }}
                                aria-label="Understood"
                                icon={<Icon as={BsCheck2} boxSize={7} />}
                            ></IconButton>
                        </CustomTooltip>
                        <CustomTooltip
                            label={"Play audio"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={playAudio}
                                aria-label="Play audio"
                                icon={
                                    <Icon
                                        as={HiOutlineSpeakerWave}
                                        boxSize={5}
                                    />
                                }
                            ></IconButton>
                        </CustomTooltip>
                        <CustomTooltip
                            label={"Show meaning"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={() => {
                                    alert("not implemented")
                                }}
                                aria-label="Show meaning"
                                icon={
                                    <Icon
                                        as={HiOutlineQuestionMarkCircle}
                                        boxSize={5}
                                    />
                                }
                                isDisabled={true}
                            ></IconButton>
                        </CustomTooltip>
                        <CustomTooltip
                            label={"Don't understand"}
                            placement={"bottom"}
                        >
                            <IconButton
                                aria-label="Don't understand"
                                onClick={() => {
                                    reviseFailure()
                                    setFlashcard(getNextReviseWord())
                                }}
                                icon={<Icon as={CloseIcon} boxSize={3} />}
                            ></IconButton>
                        </CustomTooltip>
                    </HStack>
                </VStack>
            ) : (
                <Text fontSize={"xl"}>There's no more words for you!</Text>
            )}
        </VStack>
    )
}
