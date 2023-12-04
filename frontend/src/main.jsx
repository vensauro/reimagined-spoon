import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page.jsx";
import Root, { loader as rootLoader } from "./routes/root.jsx";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact.jsx";
import EditContact, { action as editAction } from "./routes/edit.jsx";
import { action as destroyAction } from "./routes/destroy";

import "./index.css";
import Index from "./routes/index.jsx";
import { GamesPage } from "./routes/games.jsx";
import { LoginPage } from "./routes/login.jsx";

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
          { path: "/login", element: <LoginPage /> },
          { path: "/games", element: <GamesPage /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
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
