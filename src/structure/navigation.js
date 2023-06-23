import {
  IconBike,
  IconBrandBooking,
  IconCar,
  IconDashboard,
  IconGitPullRequest,
  IconPackage,
  IconPhoneCalling,
  IconUser,
  IconUserShare,
} from "@tabler/icons-react";
import About from "../pages/About";
import Account from "../pages/Account";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Private from "../pages/Private";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import CallBookings from "../pages/CallBookings";
import Packages from "../pages/Packages";
import Vehicles from "../pages/Vehicles";
import VehicleModels from "../pages/VehicleModels";
import Agent from "../pages/Agent";
import Vendor from "../pages/Vendor";

export const nav = [
  {
    path: "/",
    name: "Dashboard",
    element: <Dashboard />,
    isMenu: true,
    isPrivate: true,
    icon: <IconDashboard size="1rem" />,
    color: "blue",
  },
  {
    path: "/bookings",
    name: "Bookings",
    element: <Bookings />,
    isMenu: true,
    isPrivate: true,
    icon: <IconBrandBooking size="1rem" />,
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
    path: "/call-bookings",
    name: "Call Bookings",
    element: <CallBookings />,
    isMenu: true,
    isPrivate: true,
    icon: <IconPhoneCalling size="1rem" />,
    color: "green",
  },
  {
    path: "/packages",
    name: "Packages",
    element: <Packages />,
    isMenu: true,
    isPrivate: true,
    icon: <IconPackage size="1rem" />,
    color: "violet",
  },
  // {
  //   path: "/account",
  //   name: "Account",
  //   element: <Account />,
  //   isMenu: true,
  //   isPrivate: true,
  //   icon: <IconGitPullRequest size="1rem" />,
  //   color: "yellow",
  // },
  {
    path: "/vehicles",
    name: "Vehicles",
    element: <Vehicles />,
    isMenu: true,
    isPrivate: true,
    icon: <IconCar size="1rem" />,
    color: "gray",
  },
  {
    path: "/models",
    name: "Vehicle Models",
    element: <VehicleModels />,
    isMenu: true,
    isPrivate: true,
    icon: <IconBike size="1rem" />,
    color: "pink",
  },
  {
    path: "/agents",
    name: "Agents",
    element: <Agent />,
    isMenu: true,
    isPrivate: true,
    icon: <IconUser size="1rem" />,
    color: "blue",
  },
  {
    path: "/vendors",
    name: "Vendors",
    element: <Vendor />,
    isMenu: true,
    isPrivate: true,
    icon: <IconUserShare size="1rem" />,
    color: "orange",
  },
];
