import { Form, Link, useRouteLoaderData } from "react-router-dom";
import medal from "../../../assets/medal-first-place.png";
import * as Popover from "@radix-ui/react-popover";
import "./styles.css";

export function NavUserStatus() {
  let { user } = useRouteLoaderData("root");

  return (
    <section className="login">
      {user ? (
        <Popover.Root>
          <Popover.Trigger asChild>
            <img
              className="user-avatar"
              src={user.avatar}
              alt={user.username?.[0] ?? "A"}
            />
          </Popover.Trigger>
          <p className="user-container user-name">{user.username}</p>
          <p className="user-container">
            Mestre
            <img src={medal} alt="" />
          </p>
          <Popover.Portal>
            <Popover.Content className="popover" sideOffset={5}>
              <Form method="post" action="logout">
                <button className="primary-button">Sair</button>
              </Form>
              <Popover.Arrow className="popover-arrow" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      ) : (
        <Link className="primary-button" to="/login">
          Entrar
        </Link>
      )}
    </section>
  );
}
