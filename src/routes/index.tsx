import { createBrowserRouter, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { RenderHome } from "@/features/home";
import { RegisterPage } from "@/features/auth";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboard from "@/features/admin/dashboard";
import AdminOrders from "@/features/admin/orders";
import AdminProducts from "@/features/admin/products";
import AdminCategories from "@/features/admin/categories";
import AdminUsers from "@/features/admin/users";
import AdminFeedback from "@/features/admin/feedback";

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
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "products", element: <AdminProducts /> },
          { path: "categories", element: <AdminCategories /> },
          { path: "users", element: <AdminUsers /> },
          { path: "feedback", element: <AdminFeedback /> },
          { path: "", element: <AdminDashboard /> },
        ],
      },
    ],
  },
]);
