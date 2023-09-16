import { Outlet, RouteObject } from "react-router-dom"
import { Home } from "../Home"
import { Login } from "../Login"
import { HomeBase } from "../HomeBase"
import { HomeRead } from "../HomeRead"
import { HomeNav } from "./types"
import { ReadContent } from "../ReadContent"
import { userContentLoader } from "./loaders"
import { AddContent } from "../AddContent"

const homeNav: HomeNav[] = [
    {
        name: "Read",
        path: "content",
        tooltip: "See your submitted content",
    },
    {
        name: "Revise",
        path: "revise",
        tooltip: "Revise with flashcards",
    },
    {
        name: "Forum",
        path: "forum",
        tooltip: "Learn with others",
    },
]

const homeRoutes: RouteObject[] = [
    {
        path: "",
        element: <Home />,
    },
    {
        path: "content",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <HomeRead />,
            },
            {
                path: "new",
                element: <AddContent />,
            },
            {
                path: ":contentId",
                element: <ReadContent />,
                loader: userContentLoader,
            },
        ],
    },
    {
        path: "revise",
        element: <Home />,
    },
    {
        path: "forum",
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
