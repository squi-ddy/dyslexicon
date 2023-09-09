import { Box, Flex, Heading, Spacer } from "@chakra-ui/react"
import { NavLink, Outlet } from "react-router-dom"
import { homeNav } from "./routes"
import NavBox from "./NavBox"

function HomeBase() {
    return (
        <Flex direction="column" h="100%">    
            <Box borderRadius="md" bg="blue.700" maxWidth="full" m="1" p="4" px="8">
                <Flex>
                    <Heading fontSize="4xl">Dyslexicon</Heading>
                    <Spacer />
                    <Box margin={"auto"} fontSize="lg">Hi <b>John Doe</b>!</Box>
                </Flex>
            </Box>
            <Flex flexGrow={1} fontSize="3xl">
                <Box borderRadius="md" bg="blue.700" width="10vw" m="1" p="1" mt="0" py="2">
                    <nav style={{height: "100%"}}>
                        <Flex direction={"column"} gap={2.5} grow={1} h="full">
                            <Spacer />
                            {homeNav.map(x => <NavLink style={{width: "100%"}} key={x.path!!} to={x.path!!}>{
                                ({isActive}) => (<NavBox highlight={isActive}>{x.name}</NavBox>)
                            }</NavLink>)}
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

export default HomeBase