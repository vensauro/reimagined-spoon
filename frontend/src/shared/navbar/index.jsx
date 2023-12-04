import "./styles.css";
import logo from "../../assets/main-logo.png";

import medal from "../../assets/medal-first-place.png";
import { SearchButton } from "../search-button";

export function NavBar() {
  return (
    <header className="main-header">
      <section className="main-logo">
        <a href="index.html">
          <img src={logo} alt="logotipo" />
        </a>
        <a href="index.html">Control_Games</a>
      </section>

      <section className="menu">
        <nav>
          <a href="index.html">Home</a>
          <a href="biblioteca.html">Biblioteca</a>
          <a href="plataformas.html">Plataformas</a>
        </nav>
      </section>

      <SearchButton />

      <section className="login">
        <img
          className="user-avatar"
          src="https://i.redd.it/captain-fanart-v0-1u0gc5a1n36a1.jpg?width=2387&format=pjpg&auto=webp&s=c31b637180e666fe10006226391da3059feee56d"
          alt="avatar do usuário"
        />
        <p className="user-container user-name">Adailton Cerqueira</p>
        <p className="user-container">
          Mestre
          <img src={medal} alt="" />
        </p>
      </section>
    </header>
  );
}
