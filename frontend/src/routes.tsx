import { RouteObject } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import HomeBase from "./HomeBase"

const homeRoutes: (RouteObject & {navTitle: string})[] = [
    {
        path: "read",
        element: <Home />,
        navTitle: "Read",
    },
    {
        path: "scan",
        element: <Home />,
        navTitle: "Scan",
    },
    {
        path: "revise",
        element: <Home />,
        navTitle: "Revise",
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

export {globalRoutes, homeRoutes}