import { Tooltip, TooltipProps } from "@chakra-ui/react"
import { forwardRef } from "react"

export const CustomTooltip = forwardRef<typeof Tooltip, TooltipProps>(
    (props, ref) => {
        const newProps = { ...props }
        newProps.bg = newProps.bg ? newProps.bg : "black"
        newProps.hasArrow = newProps.hasArrow ? newProps.hasArrow : true
        newProps.textColor = newProps.textColor ? newProps.textColor : "white"
        return <Tooltip ref={ref} {...newProps}></Tooltip>
    }
)
