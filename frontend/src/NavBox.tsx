import { Box, Tooltip } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export function NavBox(
    props: PropsWithChildren<{ highlight: boolean; tooltip: string }>
) {
    return (
        <Tooltip
            hasArrow
            label={props.tooltip}
            placement={"right"}
            bg={"gray.600"}
            textColor={"white"}
        >
            <Box
                bg={props.highlight ? "blue.500" : "transparent"}
                boxShadow={props.highlight ? "md" : undefined}
                borderColor={"gray.700"}
                borderWidth={1}
                maxWidth={"full"}
                borderRadius={"lg"}
                textAlign={"center"}
                py={2.5}
                mx={2.5}
                transition={"background-color 0.2s ease-in-out"}
                _hover={{
                    bg: props.highlight ? "blue.500" : "blackAlpha.300",
                }}
            >
                {props.children}
            </Box>
        </Tooltip>
    )
}
