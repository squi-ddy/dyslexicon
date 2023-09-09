import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

function NavBox(props: PropsWithChildren<{highlight: boolean}>) {
    return (
        <Box 
            bg={props.highlight ? "blue.500" : "transparent"} 
            boxShadow={props.highlight ? "md" : undefined} 
            borderColor={"gray.700"} 
            borderWidth={1} 
            maxWidth={"full"} 
            borderRadius={"lg"} 
            textAlign={"center"} 
            py={2.5} 
            mx={2.5}>
            {props.children}
        </Box>
    )
}

export default NavBox