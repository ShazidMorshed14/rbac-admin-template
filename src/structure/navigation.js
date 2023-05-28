import { IconGitPullRequest } from "@tabler/icons-react";
import About from "../pages/About";
import Account from "../pages/Account";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Private from "../pages/Private";

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
    icon: <IconGitPullRequest size="1rem" />,
    color: "red",
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: true,
    icon: <IconGitPullRequest size="1rem" />,
    color: "red",
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
    icon: <IconGitPullRequest size="1rem" />,
    color: "red",
  },
  {
    path: "/private",
    name: "Private",
    element: <Private />,
    isMenu: true,
    isPrivate: true,
    icon: <IconGitPullRequest size="1rem" />,
    color: "red",
  },
  {
    path: "/account",
    name: "Account",
    element: <Account />,
    isMenu: true,
    isPrivate: true,
    icon: <IconGitPullRequest size="1rem" />,
    color: "red",
  },
];
