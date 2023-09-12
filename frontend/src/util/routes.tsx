import { Outlet, RouteObject } from "react-router-dom"
import { Home } from "../Home"
import { Login } from "../Login"
import { HomeBase } from "../HomeBase"
import { HomeRead } from "../HomeRead"
import { HomeNav } from "./types"
import { ReadContent } from "../ReadContent"
import { userContentLoader } from "./loaders"

const homeNav: HomeNav[] = [
    {
        name: "Read",
        path: "read",
        tooltip: "See your submitted content",
    },
    {
        name: "Add",
        path: "add",
        tooltip: "Add new content",
    },
    {
        name: "Revise",
        path: "revise",
        tooltip: "Revise with flashcards",
    },
]

const homeRoutes: RouteObject[] = [
    {
        path: "",
        element: <Home />,
    },
    {
        path: "read",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <HomeRead />,
            },
            {
                path: ":contentId",
                element: <ReadContent />,
                loader: userContentLoader,
            },
        ],
    },
    {
        path: "add",
        element: <Home />,
    },
    {
        path: "revise",
        element: <Home />,
    },
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

export { globalRoutes, homeRoutes, homeNav }
