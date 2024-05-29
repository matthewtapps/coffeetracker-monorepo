import { createBrowserRouter } from "react-router-dom";
import { BaseContainer } from "./base-container";
import CoffeeDataTable from "./components/coffee-data-table/page";
import ErrorPage from "./error-page";
import CoffeeDashboard from "./components/dashboard/page";
import EspressoShotForm from "./components/espresso-shot-form/espresso-shot-form";

export const router = createBrowserRouter(
    [
        {
            path: "/data",
            element: <BaseContainer route="shotTable" children={<CoffeeDataTable /> } />,
            errorElement: <BaseContainer route="shotTable" children={<ErrorPage /> } />,
        },
        {
            path: "/",
            element: <BaseContainer route="shotForm" children={<EspressoShotForm /> } />,
            errorElement: <BaseContainer route="shotForm" children={<ErrorPage /> } />,
        },
        {
            path: "/dashboard",
            element: <BaseContainer route="dashboard" children={<CoffeeDashboard /> } />,
            errorElement: <BaseContainer route="dashboard" children={<ErrorPage /> } />,

        }
    ]
)