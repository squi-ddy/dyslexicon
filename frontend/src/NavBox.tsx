import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

function NavBox(props: PropsWithChildren<{highlight: boolean}>) {
    return (
        <Box bg={props.highlight ? "blue.500" : "transparent"} maxWidth={"full"} borderRadius={"sm"} textAlign={"center"} py={2.5}>
            {props.children}
        </Box>
    )
}

export default NavBox