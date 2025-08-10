import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type AppRoute = React.ComponentProps<typeof Link>["href"];
type IconName = ComponentProps<typeof Ionicons>["name"];
type DashboardCards = {
  title: string;
  icon: IconName;
  goto: AppRoute;
};

const dashBoardItems: DashboardCards[] = [
  {
    title: "Wallet",
    icon: "wallet-outline",
    goto: "/pages/Wallet" as AppRoute,
  },
  {
    title: "Send",
    icon: "swap-horizontal-outline",
    goto: "/pages/SendMoney" as AppRoute,
  },
  {
    title: "Bills",
    icon: "receipt-outline",
    goto: "/pages/Bills" as AppRoute,
  },
  {
    title: "QR Code",
    icon: "qr-code-outline",
    goto: "/" as AppRoute,
  },
  {
    title: "Verification",
    icon: "shield-checkmark-outline",
    goto: "/" as AppRoute,
  }
];

export default dashBoardItems;
