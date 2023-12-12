import logo from "../../assets/main-logo.png";
import "./styles.css";

import { Link, useRouteLoaderData } from "react-router-dom";
import { NavUserStatus } from "./user-status";

export function NavBar() {
  let { user } = useRouteLoaderData("root");

  return (
    <header className="main-header">
      <section className="main-logo">
        <Link to="/">
          <img src={logo} alt="logotipo" />
        </Link>
        <Link to="/" className="title-text">
          Control_Games
        </Link>
      </section>

      <section className="menu">
        <nav>
          {user ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/biblioteca">Biblioteca</Link>
              <Link to="/plataformas">Plataformas</Link>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/plataformas">Plataformas</Link>
            </>
          )}
        </nav>
      </section>

      <NavUserStatus />
    </header>
  );
}
