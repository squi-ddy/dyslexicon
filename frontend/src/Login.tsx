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
    InputGroup
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn } from "./util/api"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)  

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
                    <Heading textAlign={"center"}>Login</Heading>
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
                                Email empty or taken
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={invalid && password === ""}
                            isRequired
                        >
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                Password empty or incorrect
                            </FormErrorMessage>
                        </FormControl>

                        <Button style={{width: '100%'}}
                            onClick={() => {
                                setInvalid(
                                    email === "" || password === ""
                                )
                                if (email === "" || password === "")
                                    return
                                if (logIn(email, password)) {
                                    navigate("/")
                                } else {
                                    setPassword("")
                                    setInvalid(true)
                                }
                            }}
                        >
                            Login
                        </Button>
                        <Text as="div" textAlign="center">
                            <span  style={{ fontSize: 14, color: "#cbd3dc" }} >Don&lsquo;t have an account?  </span>
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
                                    navigate("/signup")
                                }}
                            >
                                Sign up
                            </Button>
                        </Text>
                        {/* <Button style={{ fontSize: 14 }} colorScheme="blue" variant="link"
                            onClick={() => {
                                logIn("johndoe", "password123")
                                navigate("/")
                            }}
                        >
                            Forgot Password?
                        </Button> */}
                    
                    </VStack>
                </VStack>
            </Flex>
        </Flex>
    )
}
