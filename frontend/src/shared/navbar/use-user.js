import { useRouteLoaderData } from "react-router-dom";

export function useUser() {
  return useRouteLoaderData("root");
}
