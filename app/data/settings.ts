import { Link } from "expo-router";

type AppRoute = React.ComponentProps<typeof Link>["href"];

const settingsArr = [
  {
    id: 1,
    title: "Account Settings",
    description: "View your account details",
    icon: "person-circle-outline",
    goTo: "/pages/AccountSettings" as AppRoute,
  },
  {
    id: 2,
    title: "Notifications",
    description: "Change notification preferences",
    icon: "notifications-outline",
    goTo: "/" as AppRoute,
  },
  {
    id: 3,
    title: "Your Bills",
    description: "Monitor your bills",
    icon: "wallet-outline",
    goTo: "/pages/Bills" as AppRoute,
  },
  {
    id: 4,
    title: "About",
    description: "App version and policy",
    icon: "alert-circle",
    goTo: "/" as AppRoute,
  },
  {
    id: 5,
    title: "Support",
    description: "Support and FAQ",
    icon: "help-circle-outline",
    goTo: "/" as AppRoute,
  },
];

export default settingsArr;
