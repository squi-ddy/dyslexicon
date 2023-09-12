import {
    Box,
    Divider,
    SimpleGrid,
    Heading,
    VStack,
    Card,
    CardHeader,
    CardBody,
    Text,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { getUserContent } from "./util/api"

export function HomeRead() {
    const userContent = getUserContent()

    // todo: pagination (after splash)

    return (
        <Box bg="blue.700" w="full" minH="full" borderRadius={"md"} padding={4}>
            <VStack spacing={4}>
                <Heading>Your content</Heading>
                <Divider borderColor={"gray.700"} />
                <SimpleGrid columns={4} spacing={2} mt={4}>
                    {Object.entries(userContent).map(([id, content]) => (
                        <Card
                            key={id}
                            as={Link}
                            bg={"blue.800"}
                            variant="elevated"
                            transition={"all 0.2s ease-in-out"}
                            _hover={{
                                transform: "translateY(-5px)",
                                bg: "blackAlpha.500",
                            }}
                        >
                            <CardHeader>
                                <Heading size={"md"} noOfLines={1}>
                                    {content.title}
                                </Heading>
                            </CardHeader>
                            <CardBody>
                                <Text
                                    fontSize="sm"
                                    whiteSpace={"pre"}
                                    noOfLines={4}
                                >
                                    {content.content}
                                </Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    )
}
