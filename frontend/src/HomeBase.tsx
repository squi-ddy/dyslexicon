import {
    Box,
    Flex,
    Heading,
    Icon,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { HiOutlineLogout } from "react-icons/hi"
import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { CustomTooltip } from "./CustomTooltip"
import { NavBox } from "./NavBox"
import { isLoggedIn, handleSignOut, user_name, doAutoSignIn } from "./util/api"
import { homeNav } from "./util/routes"

export function HomeBase() {
    const navigate = useNavigate()
    const loggedIn = useLoaderData() as boolean
    if (!loggedIn) {
        navigate("/login")
    }

    return (
        <Flex direction="column" h="full">
            <Flex
                borderRadius="md"
                bg="themeColors.primary"
                maxWidth="full"
                m="1"
                p="4"
                px="8"
                gap={2}
            >
                <Heading size="2xl">Dyslexicon</Heading>
                <Spacer />
                <Text margin={"auto"} fontSize="lg">
                    Hi <b>{user_name}</b>!
                </Text>
                <CustomTooltip label={"Log out"} placement={"left"}>
                    <IconButton
                        margin={"auto"}
                        onClick={async () => {
                            await handleSignOut().then(() => navigate("/login"));
                        }}
                        float={"right"}
                        aria-label={"Log out"}
                        icon={<Icon as={HiOutlineLogout} boxSize={5} />}
                    ></IconButton>
                </CustomTooltip>
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
