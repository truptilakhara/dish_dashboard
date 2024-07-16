import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Error from "./ErroElement";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShowDishes from "./showDishes";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error />,
  },
  {
    path: "/dishes",
    element: <ShowDishes />,
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
