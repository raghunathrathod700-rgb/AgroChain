import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/app/layouts/RootLayout";
import { HomePage } from "@/app/pages/HomePage";
import { RegisterPage } from "@/app/pages/RegisterPage";
import { LoginPage } from "@/app/pages/LoginPage";
import { ForgotPasswordPage } from "@/app/pages/ForgotPasswordPage";
import { DashboardPage } from "@/app/pages/DashboardPage";
import { MarketplacePage } from "@/app/pages/MarketplacePage";
import { AboutPage } from "@/app/pages/AboutPage";
import { ServicesPage } from "@/app/pages/ServicesPage";
import { WholesalersPage } from "@/app/pages/WholesalersPage";
import { BlogPage } from "@/app/pages/BlogPage";
import { ContactPage } from "@/app/pages/ContactPage";
import { MessagesPage } from "@/app/pages/MessagesPage";
import { WalletPage } from "@/app/pages/WalletPage";
import { VehicleTrackingPage } from "@/app/pages/VehicleTrackingPage";
import { OrdersPage } from "@/app/pages/OrdersPage";
import { AdminPage } from "@/app/pages/AdminPage";
import { AdminRoute } from "@/app/components/AdminRoute";
import { NotFoundPage } from "@/app/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "register", Component: RegisterPage },
      { path: "login", Component: LoginPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "marketplace", Component: MarketplacePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "wholesalers", Component: WholesalersPage },
      { path: "blog", Component: BlogPage },
      { path: "contact", Component: ContactPage },
      { path: "messages", Component: MessagesPage },
      { path: "wallet", Component: WalletPage },
      { path: "vehicle-tracking", Component: VehicleTrackingPage },
      { path: "orders", Component: OrdersPage },
      { path: "admin", element: <AdminRoute><AdminPage /></AdminRoute> },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);