import { Box } from "@chakra-ui/react"

export function Home() {
    return (
        <Box
            bg="blue.700"
            w="full"
            minH="full"
            borderRadius={"md"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            ← Choose one of the options on the left to get started!
        </Box>
    )
}
