import { ArrowBackIcon, DeleteIcon, Icon } from "@chakra-ui/icons"
import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    IconButton,
    Input,
    Textarea,
    VStack,
    Text,
    Box,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { CustomTooltip } from "./CustomTooltip"
import { useRef, useState } from "react"
import { GoCheck } from "react-icons/go"
import { addForumPost, getLoggedInUser } from "./util/api"

export function AddForumContent() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("New Post")
    const [body, setBody] = useState("")
    const fileUploadRef = useRef<HTMLInputElement>(null)
    const [fileUploaded, setFileUploaded] = useState<File | null>(null)
    const [invalid, setInvalid] = useState(false)

    async function addContent() {
        setInvalid(title === "" || body === "")
        if (title === "" || body === "") return
        if (fileUploaded !== null) {
            console.log(fileUploaded)
            await fileUploaded.arrayBuffer().then(async (b) => {
                    console.log(b)
                    addForumPost({
                        title,
                        body
                    }, b)
                });

        } else {
            addForumPost({
                title,
                body
            }, null)
        }
        navigate(-1)
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
                <Heading textAlign={"left"} flexGrow={1}>
                    New Post
                </Heading>
                <CustomTooltip label={"Submit"} placement={"left"}>
                    <IconButton
                        onClick={async () => {await addContent()}}
                        aria-label="Submit"
                        icon={<Icon as={GoCheck} boxSize={7} />}
                    ></IconButton>
                </CustomTooltip>
            </HStack>
            <Divider />
            <FormControl isInvalid={invalid && title === ""} isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <FormErrorMessage>A title is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={invalid && body === ""} isRequired>
                <FormLabel>Body</FormLabel>
                <Textarea
                    h={300}
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value)
                    }}
                />
                <FormErrorMessage>A body is required.</FormErrorMessage>
            </FormControl>
            <Input
                ref={fileUploadRef}
                type={"file"}
                accept={"audio/*"}
                display={"none"}
                onChange={(e) =>
                    setFileUploaded(
                        e.target.files!.length > 0 ? e.target.files![0] : null
                    )
                }
            />
            <FormControl as={Flex} direction={"column"} minH={0}>
                <FormLabel>Audio</FormLabel> {/* TODO: add from mic option */}
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
                        {fileUploaded && (
                            <CustomTooltip
                                label={"Remove audio"}
                                placement={"top"}
                            >
                                <IconButton
                                    onClick={() => setFileUploaded(null)}
                                    aria-label="Remove audio"
                                    icon={<DeleteIcon boxSize={5} />}
                                ></IconButton>
                            </CustomTooltip>
                        )}
                    </HStack>
                    {fileUploaded && (
                        <Box as={"audio"} controls minH={0}>
                            <source
                                src={URL.createObjectURL(fileUploaded)}
                                type={fileUploaded.type}
                            ></source>{" "}
                        </Box>
                    )}
                </VStack>
            </FormControl>
        </VStack>
    )
}
