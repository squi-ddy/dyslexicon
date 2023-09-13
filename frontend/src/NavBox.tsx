import { Button } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { CustomTooltip } from "./CustomTooltip"

export function NavBox(
    props: PropsWithChildren<{ highlight: boolean; tooltip: string }>
) {
    return (
        <CustomTooltip hasArrow label={props.tooltip} placement={"right"}>
            <Button
                bg={props.highlight ? "themeColors.accent1" : undefined}
                boxShadow={props.highlight ? "md" : undefined}
                _hover={
                    props.highlight
                        ? {
                              bg: "themeColors.accent1",
                          }
                        : undefined
                }
                w={"full"}
                h={"fit-content"}
                borderRadius={"lg"}
                textAlign={"center"}
                py={2.5}
                mx={2.5}
                fontSize={"xl"}
            >
                {props.children}
            </Button>
        </CustomTooltip>
    )
}
