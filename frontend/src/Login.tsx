import {
    Button,
    ButtonGroup,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logIn, signUp } from "./util/api"

export function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalid, setInvalid] = useState(false)
    const navigate = useNavigate()

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
                    <VStack>
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
                                type={"password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                            <FormErrorMessage>
                                Password empty or incorrect
                            </FormErrorMessage>
                        </FormControl>
                        <ButtonGroup>
                            <Button
                                onClick={() => {
                                    setInvalid(
                                        username === "" || password === ""
                                    )
                                    if (username === "" || password === "")
                                        return
                                    if (logIn(username, password)) {
                                        navigate("/")
                                    } else {
                                        setPassword("")
                                        setInvalid(true)
                                    }
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => {
                                    setInvalid(
                                        username === "" || password === ""
                                    )
                                    if (username === "" || password === "")
                                        return
                                    if (signUp(username, password)) {
                                        navigate("/")
                                    } else {
                                        setUsername("")
                                        setInvalid(true)
                                    }
                                }}
                            >
                                Sign up
                            </Button>
                            <Button
                                onClick={() => {
                                    logIn("johndoe", "password123")
                                    navigate("/")
                                }}
                            >
                                Guest account
                            </Button>
                        </ButtonGroup>
                    </VStack>
                </VStack>
            </Flex>
        </Flex>
    )
}
