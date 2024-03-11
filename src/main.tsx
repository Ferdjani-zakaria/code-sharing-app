import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "@/pages/homePage/HomePage";
import ErrorPage from "@/pages/errorPage/errorPage";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./Main.scss";

const router = createHashRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/:id",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
