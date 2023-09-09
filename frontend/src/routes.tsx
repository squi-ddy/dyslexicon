import { RouteObject } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import HomeBase from "./HomeBase"

const homeNav = [
    {
        name: "Read",
        path: "read",
    }, 
    {
        name: "Scan",
        path: "scan",
    },
    {
        name: "Revise",
        path: "revise",
    }
]

const homeRoutes: (RouteObject & {navTitle?: string})[] = [
    {
        path: "",
        element: <Home />,
    },
    {
        path: "read",
        element: <Home />,
    },
    {
        path: "scan",
        element: <Home />,
    },
    {
        path: "revise",
        element: <Home />,
    }
]

const globalRoutes: RouteObject[] = [
    {
        path: "/",
        element: <HomeBase />,
        children: homeRoutes,
    },
    {
        path: "login",
        element: <Login />,
    },
]

export {globalRoutes, homeRoutes, homeNav}