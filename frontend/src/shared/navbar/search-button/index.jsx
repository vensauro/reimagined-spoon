import blueMagnifier from "../../../assets/loupe-blue.svg";
import whiteMagnifier from "../../../assets/loupe-white.svg";
import "./styles.css";

export function SearchButton() {
  return (
    <section className="search-container">
      <input type="text" className="search-input" placeholder="Pesquisar..." />
      <a className="search-button">
        <img
          id="lupa-azul"
          src={blueMagnifier}
          alt=""
          width="25px"
          height="25px"
        />
        <img
          id="lupa-branca"
          src={whiteMagnifier}
          alt=""
          width="25px"
          height="25px"
        />
      </a>
    </section>
  );
}
