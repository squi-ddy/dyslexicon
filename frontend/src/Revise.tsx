import { CloseIcon, Icon, SettingsIcon,} from "@chakra-ui/icons"
import {
    Divider,
    HStack,
    Heading,
    IconButton,
    Text,
    VStack,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Switch,
    useDisclosure,
    FormControl,
    FormLabel
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BsCheck2 } from "react-icons/bs"
import {
    HiOutlineQuestionMarkCircle,
    HiOutlineSpeakerWave,
    HiOutlineEye,
    HiOutlineEyeSlash
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [study, setStudy] = useState(localStorage.getItem('study') ? localStorage.getItem('study') == 'true' : false);
    const [show, setShow] = useState(false);


  useEffect(() => {
    // Save count to local storage whenever it changes
    localStorage.setItem('study', study.toString());
  }, [study]);

    const [flashcard, setFlashcard] = useState(getNextReviseWord())

    useEffect(() => {
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
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Setting</ModalHeader>
            <ModalCloseButton />
            <ModalBody paddingBottom='6' display='flex' alignItems={"center"} justifyContent={"center"}>
            <FormControl display='flex' alignItems={"center"} justifyContent={"center"}>
                <FormLabel htmlFor='spelling' mb='0' display="flex" alignItems='center'>
                    Spelling
                </FormLabel>
                <Switch defaultChecked={study} id='spelling' onChange={() => setStudy(!study)}/>
                </FormControl>
            </ModalBody>
            </ModalContent>
        </Modal>
        <VStack w={"full"} h={"full"} spacing={2}>
            <Flex align={"center"} gap={3} w={"full"} justify={"space-between"}>
            
                <Heading textAlign={"center"}>Flashcards</Heading>
                <CustomTooltip label={"Settings"} placement={"right"}>
                                <IconButton
                                    onClick={onOpen}
                                    aria-label="Settings"
                                    icon={<SettingsIcon boxSize={7} />}
                                ></IconButton>
                            </CustomTooltip>
            </Flex>
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
                        {(!study || show) ? <Text fontSize={["3xl", "5xl", "9xl"]}>
                            {flashcard}
                        </Text> :
                        <CustomTooltip
                            label={"Play audio"}
                            placement={"bottom"}
                        >
                            <IconButton
                                
                                fontSize="2xl" 
                                onClick={playAudio}
                                aria-label="Play audio"
                                icon={
                                    <Icon
                                        as={HiOutlineSpeakerWave}
                                        // boxSize={20}
                                    />
                                }
                            ></IconButton>
                        </CustomTooltip>}
                    </HStack>
                    <HStack>
                        <CustomTooltip
                            label={"Understood"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={() => {
                                    setShow(false)
                                    reviseSuccess()
                                    setFlashcard(getNextReviseWord())
                                }}
                                aria-label="Understood"
                                icon={<Icon as={BsCheck2} boxSize={7} />}
                            ></IconButton>
                        </CustomTooltip>
                        {!study ? <CustomTooltip
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
                        : (<CustomTooltip
                            label={"Show/Hide text"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={() => {
                                    setShow(!show)
                                }}
                                aria-label="Show/Hide text"
                                icon={
                                    <Icon
                                        as={show ? HiOutlineEyeSlash : HiOutlineEye}
                                        boxSize={5}
                                    />
                                }
                            ></IconButton>
                        </CustomTooltip>) }
                        <CustomTooltip
                            label={"Don't understand"}
                            placement={"bottom"}
                        >
                            <IconButton
                                aria-label="Don't understand"
                                onClick={() => {
                                    setShow(false)
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
        </>
    )
}
