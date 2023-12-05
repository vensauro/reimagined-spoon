import { redirect } from "react-router-dom";
import { authClient } from "../../api/auth";

function noop() {
  return null;
}

export function authLoader(loader = noop) {
  return async (...params) => {
    if (!(await authClient.isAuthenticated())) {
      return redirect("/login");
    }

    const loaderResult = await loader(...params);

    return loaderResult ?? null;
  };
}
