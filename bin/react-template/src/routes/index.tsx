import { type FC, type ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Root } from "./root";
import { HomePage } from "./home";
import { DashboardPage } from "./dashboard";
import { AuthPage } from "./auth";
import { LoginForm } from "./auth/login";
import { RegistrationForm } from "./auth/register";
import { ProtectedRoute } from "@/components/ui/protected-route";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomePage
    },
    {
        Component: ProtectedRoute,
        children: [
            {
                Component: Root,
                children: [
                    {
                        index: true,
                        path: "dashboard",
                        Component: DashboardPage
                    },
                ]
            }
        ]
    },
    {
        path: "auth",
        element: <AuthPage />,
        children: [
            {
                index: true,
                Component: LoginForm
            },
            {
                path: "login",
                Component: LoginForm
            },
            {
                path: "register",
                Component: RegistrationForm
            }
        ]
    }
]);
export const Routes: FC = (): ReactElement<any> => (
    <RouterProvider router={router} />
);
