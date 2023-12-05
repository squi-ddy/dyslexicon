import {
    Button,
    Text,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
    InputRightElement,
    InputGroup,
    HStack,
    Checkbox,
    useToast 
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleSignUp } from "./util/api"

export function SignUp() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)  
    const toast = useToast()

    return (
            <Flex direction="column" h="full">
                <Flex
                    borderRadius="md"
                    bg="themeColors.primary"
                    maxWidth="full"
                    m="1"
                    p="4"
                    px="8"
                >
                    <Heading flexGrow={1} size="2xl" textAlign={"center"}>
                        Dyslexicon
                    </Heading>
                </Flex>
                <Flex minH={0} grow={1} fontSize="3xl">
                    <VStack
                        flexGrow={1}
                        minW={0}
                        bg="themeColors.primary"
                        borderRadius={"md"}
                        padding={4}
                        mx="1"
                        mb="1"
                    >
                        <Heading textAlign={"center"}>Sign Up</Heading>
                        <Divider />
                        <VStack
                            overflowY={"scroll"}
                        >
                            <FormControl
                                isInvalid={invalid && email === ""}
                                isRequired
                            >
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type={"email"}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                                <FormErrorMessage>
                                    Username empty or taken
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={invalid && username === ""}
                                isRequired
                            >
                                <FormLabel>Username</FormLabel>
                                <Input
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                />
                                <FormErrorMessage>
                                    Username empty or taken
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={invalid && password === ""}
                                isRequired
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                                <FormErrorMessage>
                                    Password empty or incorrect
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={password !== confirm}
                                isRequired
                            >
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    value={confirm}
                                    onChange={(e) => {
                                        setConfirm(e.target.value)
                                    }}
                                />
                                <FormErrorMessage>
                                    Passwords do not match
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <HStack w={"full"}>
                                    <FormLabel flexGrow={1} m={0}>Show Password</FormLabel>
                                    <Checkbox isChecked={show} onChange={(e) => setShow(e.target.checked)} />
                                </HStack>
                            </FormControl>
                            <Button w={"full"} flexShrink={0}
                                onClick={async () => {
                                    setInvalid(
                                        email === "" || password === ""
                                    )

                                    try {
                                        if (await handleSignUp({username, password, email})) {
                                            navigate("/sign-up/confirm")
                                        } else {
                                            navigate("/")
                                        }
                                        // 
                                        toast({
                                            title: 'Success',
                                            description: "Account Created!",
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                          })
                                    } catch (error : any) {
                                        
                                        toast({
                                            title: 'Error',
                                            description: error.message,
                                            status: 'error',
                                            duration: 9000,
                                            isClosable: true,
                                          })
                                        
                                        setUsername("")
                                        setConfirm("")
                                        setPassword("")
                                        setInvalid(true)
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                            {/* <Button style={{ fontSize: 14 }} colorScheme="blue" variant="link"
                                onClick={() => {
                                    logIn("johndoe", "password123")
                                    navigate("/")
                                }}
                            >
                                Forgot Password?
                            </Button> */}
                        
                        </VStack>
                        <Text as="div" textAlign="center">
                            <span  style={{ fontSize: 14, color: "#cbd3dc" }} >Already have an account?  </span>
                            <Button style={{ fontSize: 14 }} colorScheme="blue" variant="link"
                                onClick={() => {
                                    // setInvalid(
                                    //     email === "" || password === ""
                                    // )
                                    // if (email === "" || password === "")
                                    //     return
                                    // if (signUp(email, password)) {
                                    //     navigate("/")
                                    // } else {
                                    //     setEmail("")
                                    //     setInvalid(true)
                                    // }
                                    navigate("/login")
                                }}
                            >
                                Login
                            </Button>
                        </Text>
                    </VStack>  
                </Flex>
            </Flex>                 
    )
}
