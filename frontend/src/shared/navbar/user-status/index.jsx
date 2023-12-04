import { Link, useRouteLoaderData } from "react-router-dom";
import medal from "../../../assets/medal-first-place.png";
import "./styles.css";

export function NavUserStatus() {
  let { user } = useRouteLoaderData("root");

  return (
    <section className="login">
      {user ? (
        <>
          <img
            className="user-avatar"
            src="https://i.redd.it/captain-fanart-v0-1u0gc5a1n36a1.jpg?width=2387&format=pjpg&auto=webp&s=c31b637180e666fe10006226391da3059feee56d"
            alt="avatar do usuário"
          />
          <p className="user-container user-name">{user.username}</p>
          <p className="user-container">
            Mestre
            <img src={medal} alt="" />
          </p>
        </>
      ) : (
        <Link className="primary_button" to="/login">
          Entrar
        </Link>
      )}
    </section>
  );
}
