import { ArrowBackIcon } from "@chakra-ui/icons"
import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Icon,
    IconButton,
    Image,
    Input,
    Select,
    Text,
    Textarea,
    VStack,
    useToast,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { GoCheck } from "react-icons/go"
import { useNavigate } from "react-router-dom"
import { CustomTooltip } from "./CustomTooltip"
import { addUserContent } from "./util/api"
import { Predictions } from "@aws-amplify/predictions"

export function AddReadContent() {
    const toast = useToast()
    const navigate = useNavigate()
    const [title, setTitle] = useState("New Content")
    const [contentType, setContentType] = useState("ai")
    const [body, setBody] = useState("")
    const fileUploadRef = useRef<HTMLInputElement>(null)
    const [fileAccept, setFileAccept] = useState("")
    const [fileUploaded, setFileUploaded] = useState<File | null>(null)
    const [invalid, setInvalid] = useState(false)

    useEffect(() => {
        fileUploadRef.current!.value = ""
        setFileUploaded(null)
        if (contentType === "image") {
            setFileAccept("image/*")
        } else if (contentType === "audio") {
            setFileAccept("audio/*")
        }
    }, [contentType])

    async function addContent() {
        setInvalid(
            title === "" || (contentType !== "text" && contentType !== "image")
        )
        if (title === "" || contentType !== "text") return
        if (contentType === "text") {
        } else if (contentType === "image") {
            // TODO: other content types
            if (fileUploaded === null) return
            const response = await Predictions.identify({
                text: { source: { file: fileUploaded } },
            })

            const body = String(response.text.fullText)
        } else if (contentType === "audio") {
            // TODO
        }
        toast.promise(
            addUserContent({
                title,
                body,
            }).then(() => {
                navigate(-1)
            }),
            {
                success: {
                    title: "Success",
                    description: "AudioNotes Created",
                },
                error: {
                    title: "Failure",
                    description: "Something went wrong",
                },
                loading: { title: "Loading", description: "Making AudioNotes" },
            }
        )
    }

    return (
        <VStack w={"full"} h={"full"} spacing={2}>
            <Flex align={"center"} w={"full"} gap={3}>
                <CustomTooltip label={"Back"} placement={"right"}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        aria-label="Back"
                        icon={<ArrowBackIcon boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
                <Heading flexGrow={1}>New Content</Heading>
                <CustomTooltip label={"Submit"} placement={"left"}>
                    <IconButton
                        onClick={addContent}
                        aria-label="Submit"
                        icon={<Icon as={GoCheck} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
            </Flex>
            <Divider />
            <FormControl isInvalid={invalid && title === ""} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <FormErrorMessage>A title is required.</FormErrorMessage>
            </FormControl>
            <FormControl
                isInvalid={
                    invalid && contentType !== "text" && contentType !== "image"
                }
            >
                <FormLabel>Content Type</FormLabel>
                <Select
                    value={contentType}
                    onChange={(e) => {
                        setContentType(e.target.value)
                    }}
                >
                    <option value={"ai"}>AI Generated</option>
                    <option value={"text"}>Text</option>
                    <option value={"image"}>Image</option>
                    <option value={"audio"}>Audio</option>
                </Select>
                <FormErrorMessage>(Note: not implemented yet)</FormErrorMessage>
            </FormControl>
            <Input
                ref={fileUploadRef}
                type={"file"}
                accept={fileAccept}
                display={"none"}
                onChange={(e) =>
                    setFileUploaded(
                        e.target.files!.length > 0 ? e.target.files![0] : null
                    )
                }
            />
            {contentType === "text" ? (
                <FormControl as={Flex} direction={"column"} flexGrow={1}>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                        value={body}
                        onChange={(e) => {
                            setBody(e.target.value)
                        }}
                        flexGrow={1}
                    />
                </FormControl>
            ) : contentType === "image" ? (
                <FormControl as={Flex} direction={"column"} minH={0} isRequired>
                    <FormLabel>Image</FormLabel>{" "}
                    {/* TODO: add from camera option */}
                    <VStack
                        minH={0}
                        p={2}
                        spacing={2}
                        borderWidth={2}
                        borderColor={"themeColors.accent1"}
                        borderRadius={"md"}
                    >
                        <HStack>
                            <Button
                                onClick={() => {
                                    fileUploadRef.current!.click()
                                }}
                            >
                                Upload
                            </Button>
                            <Text fontSize={"md"}>
                                {fileUploaded
                                    ? fileUploaded.name
                                    : "No file selected"}
                            </Text>
                        </HStack>
                        {fileUploaded && (
                            <Image
                                minH={0}
                                src={URL.createObjectURL(fileUploaded)}
                            />
                        )}
                    </VStack>
                </FormControl>
            ) : contentType === "audio" ? (
                <FormControl as={Flex} direction={"column"} minH={0} isRequired>
                    <FormLabel>Audio</FormLabel>{" "}
                    {/* TODO: add from mic option */}
                    <VStack
                        minH={0}
                        p={2}
                        spacing={2}
                        borderWidth={2}
                        borderColor={"themeColors.accent1"}
                        borderRadius={"md"}
                    >
                        <HStack>
                            <Button
                                onClick={() => {
                                    fileUploadRef.current!.click()
                                }}
                            >
                                Upload
                            </Button>
                            <Text fontSize={"md"}>
                                {fileUploaded
                                    ? fileUploaded.name
                                    : "No file selected"}
                            </Text>
                        </HStack>
                        {fileUploaded ? (
                            <Box as={"audio"} controls minH={0}>
                                <source
                                    src={URL.createObjectURL(fileUploaded)}
                                    type={fileUploaded.type}
                                ></source>{" "}
                            </Box>
                        ) : (
                            <></>
                        )}
                    </VStack>
                </FormControl>
            ) : (
                <></>
            )}
        </VStack>
    )
}
