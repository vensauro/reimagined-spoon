import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./error-page.jsx";
import Root, { loader as rootLoader } from "./routes/root.jsx";

import Index from "./routes/index.jsx";
import { GamesPage } from "./routes/games/games.jsx";
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
import {
  LibraryPage,
  loader as libraryLoader,
} from "./routes/library/index.jsx";
import {
  AddGameToLibraryPage,
  loader as addToLibraryLoader,
  action as addToLibraryAction,
} from "./routes/library/add-to-library/index.jsx";
import {
  GamesCreatePage,
  loader as gamesCreateLoader,
  action as gamesCreateAction,
} from "./routes/games/create/index.jsx";
import {
  LibraryGame,
  loader as userGameLoader,
  action as removeGameAction,
} from "./routes/library/detail/index.jsx";
import {
  EditLibraryGamePage,
  loader as editLibraryLoader,
  action as editLibraryAction,
} from "./routes/library/edit-library-item/index.jsx";

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
          {
            path: "/biblioteca",
            element: <LibraryPage />,
            loader: libraryLoader,
          },
          {
            path: "/biblioteca/:gameId",
            element: <LibraryGame />,
            loader: userGameLoader,
            action: removeGameAction,
          },
          {
            path: "/biblioteca/adicionar",
            element: <AddGameToLibraryPage />,
            loader: addToLibraryLoader,
            action: addToLibraryAction,
          },
          {
            path: "/biblioteca/:gameId/editar",
            element: <EditLibraryGamePage />,
            loader: editLibraryLoader,
            action: editLibraryAction,
          },
          {
            path: "/games/criar",
            element: <GamesCreatePage />,
            loader: gamesCreateLoader,
            action: gamesCreateAction,
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
