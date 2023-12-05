import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./error-page.jsx";
import Root, { loader as rootLoader } from "./routes/root.jsx";

import Index from "./routes/index.jsx";
import { GamesPage } from "./routes/games.jsx";
import {
  LoginPage,
  loader as loginLoader,
  action as loginAction,
} from "./routes/login/index.jsx";
import {
  RegisterPage,
  loader as registerLoader,
  action as registerAction,
} from "./routes/login/register.jsx";
import { logout } from "./routes/login/logout.jsx";
import {
  Platforms,
  loader as platformsLoader,
  action as platformsAction,
} from "./routes/platforms/index.jsx";
import {
  PlatformCreate,
  loader as platformCreateLoader,
  action as platformCreateAction,
} from "./routes/platforms/platform-create/index.jsx";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "/login",
            element: <LoginPage />,
            loader: loginLoader,
            action: loginAction,
          },
          {
            path: "/cadastro",
            element: <RegisterPage />,
            loader: registerLoader,
            action: registerAction,
          },
          { path: "/logout", action: logout },
          { path: "/games", element: <GamesPage /> },
          {
            path: "/plataformas",
            element: <Platforms />,
            loader: platformsLoader,
            action: platformsAction,
          },
          {
            path: "/plataformas/criar",
            element: <PlatformCreate />,
            loader: platformCreateLoader,
            action: platformCreateAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
