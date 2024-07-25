import { createBrowserRouter } from "react-router-dom";
import CoffeeDataTablePage from "./pages/coffee-data-table";
import DashboardPage from "./pages/dashboard";
import EspressoShotFormPage from "./pages/espresso-shot-form";
import ErrorPage from "./pages/error";
import ProtectedRoute from "./lib/ProtectedRoute";
import { LoginForm } from "./pages/login";

export const router = createBrowserRouter([
  {
    path: "/data",
    element: <ProtectedRoute element={<CoffeeDataTablePage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute element={<EspressoShotFormPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<DashboardPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  }
]);
