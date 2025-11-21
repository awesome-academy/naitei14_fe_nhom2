import { createBrowserRouter, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { RenderHome } from "@/features/home";
import {
  RegisterPage,
  ActivatePage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "@/features/auth";

const LayoutWrapper = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: [
      {
        path: "/",
        element: <RenderHome />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
      {
        path: "auth/activate",
        element: <ActivatePage />,
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "auth/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "auth/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
]);
