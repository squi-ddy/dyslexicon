import { Flex, Heading, VStack, Divider, FormControl, FormLabel, Input, FormErrorMessage, HStack, Checkbox, Button, Text, useToast } from "@chakra-ui/react"
import { handleSignUpConfirmation, getLoggedInUser, isInSignUp, getSignUpUser } from "./util/api"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export function ConfirmSignUp() {
    const [invalid, setInvalid] = useState(false)
    const inputEle = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {
        if (!isInSignUp()) {
            navigate("/sign-up")
        }
    }, [])

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
                    <Heading textAlign={"center"}>Confirm Sign Up</Heading>
                    <Divider />
                    <VStack
                        overflowY={"scroll"}
                    >
                        <Text fontSize={"md"}>
                            A confirmation code has been sent to your email. Please enter it below.
                        </Text>
                        <FormControl
                            isInvalid={invalid}
                            isRequired
                        >
                            <Input
                                type={"text"}
                                textAlign={"center"}
                                ref={inputEle}
                            />
                            <FormErrorMessage>
                                Wrong confirmation code
                            </FormErrorMessage>
                        </FormControl>

                        <Button w={"full"} flexShrink={0}
                            onClick={async () => {
                                const code = inputEle.current!.value
                                setInvalid(
                                    code === ""
                                )
                                if (code === "") {
                                    return
                                }
                                    if (await handleSignUpConfirmation({username: getSignUpUser(), confirmationCode: code})) {
                                        toast({
                                            title: 'Success',
                                            description: "Account Created!",
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                          })
                                        navigate("/")
                                    } else {
                                        setInvalid(true)
                                    }

                                
                            }}
                        >
                            Confirm
                        </Button>
                    
                    </VStack>
                </VStack>
            </Flex>
        </Flex>
    )
}