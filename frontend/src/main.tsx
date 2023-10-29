import React from "react"
import ReactDOM from "react-dom/client"
import {
    ChakraProvider,
    extendTheme,
    ColorModeScript,
    DarkMode,
    theme,
} from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { globalRoutes } from "./util/routes.tsx"

const router = createBrowserRouter(globalRoutes, { basename: "/dyslexicon" })

const siteTheme = extendTheme({
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
                bg: "themeColors.background",
                textColor: "white",
                h: "100%",
            },
            html: {
                h: "100%",
            },
        },
    },
    colors: {
        themeColors: {
            background: theme.colors.gray["900"],
            popoverBackground: theme.colors.blue["700"],
            primary: theme.colors.blue["800"],
            accent1: theme.colors.blue["600"],
        },
    },
    components: {
        Button: {
            variants: {
                outline: {
                    borderColor: "themeColors.accent1",
                    borderWidth: 2,
                    _hover: {
                        bg: "blackAlpha.200",
                    },
                    _active: {
                        bg: "blackAlpha.300",
                    },
                },
            },
            defaultProps: {
                variant: "outline",
            },
        },
        Input: {
            variants: {
                outline: {
                    field: {
                        display: "flex",
                        borderColor: "themeColors.accent1",
                        borderWidth: 2,
                        _hover: {
                            bg: "blackAlpha.200",
                            borderColor: "themeColors.accent1",
                        },
                        _active: {
                            bg: "blackAlpha.300",
                        },
                    },
                },
            },
        },
        Textarea: {
            variants: {
                outline: {
                    borderColor: "themeColors.accent1",
                    borderWidth: 2,
                    _hover: {
                        bg: "blackAlpha.200",
                        borderColor: "themeColors.accent1",
                    },
                    _active: {
                        bg: "blackAlpha.300",
                    },
                },
            },
        },
        Select: {
            variants: {
                outline: {
                    field: {
                        display: "flex",
                        borderColor: "themeColors.accent1",
                        borderWidth: 2,
                        _hover: {
                            bg: "blackAlpha.200",
                            borderColor: "themeColors.accent1",
                        },
                        _active: {
                            bg: "blackAlpha.300",
                        },
                    },
                    icon: {
                        h: "full",
                    },
                },
            },
        },
        Divider: {
            baseStyle: {
                borderColor: "themeColors.accent1",
                borderWidth: 5,
            },
        },
        Card: {
            variants: {
                outline: {
                    container: {
                        borderWidth: 2,
                        borderColor: "themeColors.accent1",
                        bg: "transparent",
                    },
                },
                "clickable-card": {
                    ...theme.components.Card.variants?.outline,
                    container: {
                        ...theme.components.Card.variants?.outline?.container,
                        borderWidth: 2,
                        borderColor: "themeColors.accent1",
                        bg: "transparent",
                        _hover: {
                            bg: "blackAlpha.200",
                        },
                        _active: {
                            bg: "blackAlpha.300",
                        },
                        transition: "all 0.2s ease-in-out",
                    },
                },
            },
            defaultProps: {
                variant: "outline",
            },
        },
    },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={siteTheme.config.initialColorMode} />
        <ChakraProvider theme={siteTheme}>
            <DarkMode>
                <RouterProvider router={router} />
            </DarkMode>
        </ChakraProvider>
    </React.StrictMode>
)
