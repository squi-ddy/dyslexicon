import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { globalRoutes } from "./util/routes.tsx"

const router = createBrowserRouter(globalRoutes)

const theme = extendTheme({
    config: {
        initialColorMode: "system",
        useSystemColorMode: false,
    },
    styles: {
        global: {
            "#root": {
                h: "100%",
            },
            body: {
                bg: "gray.700",
                textColor: "white",
                fontSize: "xl",
                h: "100%",
            },
            html: {
                h: "100%",
            },
        },
    },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
)
