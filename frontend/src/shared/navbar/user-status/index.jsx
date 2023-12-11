import { Link, useRouteLoaderData } from "react-router-dom";
import "./styles.css";

export function NavUserStatus() {
  let { user } = useRouteLoaderData("root");

  return (
    <section className="login">
      {user ? (
        <Link to="/profile" className="user-menu-link">
          <img
            className="user-avatar"
            src={user.avatar}
            alt={user.username?.[0] ?? "A"}
          />
          <p className="user-container user-name">{user.username}</p>
        </Link>
      ) : (
        <Link className="primary-button" to="/login">
          Entrar
        </Link>
      )}
    </section>
  );
}
