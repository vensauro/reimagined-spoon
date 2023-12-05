import { Outlet, useNavigation } from "react-router-dom";
import { authClient } from "../api/auth";
import { NavBar } from "../shared/navbar";
import { Footer } from "../shared/footer";

export async function loader() {
  const user = await authClient.getLoggedUser();
  return { user };
}

export default function Root() {
  const navigation = useNavigation();

  // const { user } = useLoaderData();

  return (
    <>
      <NavBar />

      <main
        className={
          navigation.state === "loading" ? "loading" : "" + " root-container"
        }
      >
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
