import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Codes from "./Codes.jsx";
import FilteredCoupons from "./FilteredCoupons.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/codes",
    element: <Codes />,
  },
  {
    path: "/coupons/:selectedDate",
    element: <FilteredCoupons />,
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
