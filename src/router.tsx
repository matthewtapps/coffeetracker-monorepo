import { createBrowserRouter } from "react-router-dom";
import CoffeeDataTablePage from "./pages/coffee-data-table";
import DashboardPage from "./pages/dashboard";
import EspressoShotFormPage from "./pages/espresso-shot-form";
import ErrorPage from "./pages/error";

export const router = createBrowserRouter([
  {
    path: "/data",
    element: <CoffeeDataTablePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <EspressoShotFormPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
]);
