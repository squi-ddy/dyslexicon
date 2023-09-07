import { Box, Flex, Heading, Spacer, VStack } from "@chakra-ui/react"
import { NavLink, Outlet } from "react-router-dom"
import { homeRoutes } from "./routes"
import NavBox from "./NavBox"

function HomeBase() {
    return (
        <Flex direction="column" h="100%">    
            <Box borderRadius="md" bg="blue.700" maxWidth="full" m="1" p="1" px="2">
                <Flex>
                    <Heading fontSize="4xl">Dyslexicon</Heading>
                    <Spacer />
                    <Box margin={"auto"} fontSize="lg">Hi <b>John Doe</b>!</Box>
                </Flex>
            </Box>
            <Flex flexGrow={1} fontSize="3xl">
                <Box borderRadius="md" bg="blue.700" width="10vw" m="1" p="1" mt="0" py="2">
                    <nav style={{height: "100%"}}>
                        <Flex direction={"column"} gap={15} grow={1} h="full">
                            <Spacer />
                            {homeRoutes.map(x => <NavLink style={{width: "100%"}} key={x.path!!} to={x.path!!}>{
                                ({isActive}) => (<NavBox highlight={isActive}>{x.navTitle}</NavBox>)
                            }</NavLink>)}
                            <Spacer />
                        </Flex>
                    </nav>
                </Box>
                <Box>
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    )
}

export default HomeBase