import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { NavLink, Outlet } from "react-router-dom"
import { homeNav } from "./util/routes"
import { NavBox } from "./NavBox"

export function HomeBase() {
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
                <Heading size="2xl">Dyslexicon</Heading>
                <Spacer />
                <Text margin={"auto"} fontSize="lg">
                    Hi <b>John Doe</b>!
                </Text>
            </Flex>
            <Flex minH={0} grow={1} fontSize="3xl">
                <Flex
                    borderRadius="md"
                    bg="themeColors.primary"
                    minW={150}
                    m="1"
                    p="1"
                    mt="0"
                    py="2"
                    direction={"column"}
                >
                    <Spacer />
                    <Flex as="nav" direction={"column"} gap={2.5}>
                        {homeNav.map((x) => (
                            <NavLink
                                key={x.path!}
                                to={x.path!}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
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
                    </Flex>
                    <Spacer />
                </Flex>
                <Box
                    flexGrow={1}
                    minW={0}
                    bg="themeColors.primary"
                    borderRadius={"md"}
                    padding={4}
                    mr="1"
                    mb="1"
                >
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    )
}
