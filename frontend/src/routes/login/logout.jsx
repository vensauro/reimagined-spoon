import { redirect } from "react-router-dom";
import { authClient } from "../../api/auth";

export async function logout() {
  await authClient.logout();
  return redirect("/");
}
