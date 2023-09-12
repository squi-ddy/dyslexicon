import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { NavLink, Outlet } from "react-router-dom"
import { homeNav } from "./util/routes"
import { NavBox } from "./NavBox"

export function HomeBase() {
    return (
        <Flex direction="column" h="100%">
            <Box
                borderRadius="md"
                bg="blue.700"
                maxWidth="full"
                m="1"
                p="4"
                px="8"
            >
                <Flex>
                    <Heading size="2xl">Dyslexicon</Heading>
                    <Spacer />
                    <Text margin={"auto"} fontSize="lg">
                        Hi <b>John Doe</b>!
                    </Text>
                </Flex>
            </Box>
            <Flex flexGrow={1} fontSize="3xl">
                <Box
                    borderRadius="md"
                    bg="blue.700"
                    width="10vw"
                    m="1"
                    p="1"
                    mt="0"
                    py="2"
                >
                    <nav style={{ height: "100%" }}>
                        <Flex direction={"column"} gap={2.5} grow={1} h="full">
                            <Spacer />
                            {homeNav.map((x) => (
                                <NavLink
                                    style={{ width: "100%" }}
                                    key={x.path!}
                                    to={x.path!}
                                >
                                    {({ isActive }) => (
                                        <NavBox
                                            tooltip={x.tooltip}
                                            highlight={isActive}
                                        >
                                            {x.name}
                                        </NavBox>
                                    )}
                                </NavLink>
                            ))}
                            <Spacer />
                        </Flex>
                    </nav>
                </Box>
                <Box w="full" mr="1" mb="1">
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    )
}
