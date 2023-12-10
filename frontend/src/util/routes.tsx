import { Outlet, RouteObject } from "react-router-dom"
import { Home } from "../Home"
import { Login } from "../Login"
import { HomeBase } from "../HomeBase"
import { HomeRead } from "../Read"
import { HomeNav } from "./types"
import { ReadContent } from "../ReadContent"
import {
    forumContentLoader,
    homeContentLoader,
    userContentLoader,
} from "./loaders"
import { AddReadContent } from "../AddReadContent"
import { Forum } from "../Forum"
import { ForumContent } from "../ForumContent"
import { AddForumContent } from "../AddForumContent"
import { Revise } from "../Revise"
import { SignUp } from "../SignUp"
import { ConfirmSignUp } from "../ConfirmSignUp"

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
                element: <AddReadContent />,
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
        element: <Revise />,
    },
    {
        path: "forum",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <Forum />,
            },
            {
                path: "new",
                element: <AddForumContent />,
            },
            {
                path: ":contentId",
                element: <ForumContent />,
                loader: forumContentLoader,
            },
        ],
    },
]

const globalRoutes: RouteObject[] = [
    {
        path: "/",
        element: <HomeBase />,
        loader: homeContentLoader,
        children: homeRoutes,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "sign-up",
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <SignUp />,
            },
            {
                path: "confirm",
                element: <ConfirmSignUp />,
            },
        ],
    },
]

export { globalRoutes, homeRoutes, homeNav }
