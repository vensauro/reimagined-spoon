import "./styles.css";
import logo from "../../assets/main-logo.png";

import { SearchButton } from "./search-button";
import { NavUserStatus } from "./user-status";
import { Link, useRouteLoaderData } from "react-router-dom";

export function NavBar() {
  let { user } = useRouteLoaderData("root");

  return (
    <header className="main-header">
      <section className="main-logo">
        <Link to="/">
          <img src={logo} alt="logotipo" />
        </Link>
        <Link to="/">Control_Games</Link>
      </section>

      <section className="menu">
        <nav>
          {user ? (
            <>
              <Link to="/">Home</Link>
              <a href="biblioteca.html">Biblioteca</a>
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

      <SearchButton />

      <NavUserStatus />
    </header>
  );
}
