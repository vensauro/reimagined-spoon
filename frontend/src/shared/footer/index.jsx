import customerIcon from "../../assets/customer-support.png";
import settingsIcons from "../../assets/settings.png";
import logo from "../../assets/main-logo.png";
import { Link } from "react-router-dom";
import "./styles.css";

export function Footer() {
  return (
    <footer>
      <section className="rodape">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <a href="#">Control_Games</a>
        </div>

        <div className="footer-links">
          <a href="suportelogincadastro.html">
            <img src={customerIcon} alt="suporte" />
            Suporte
          </a>
          <a href="#">
            <img src={settingsIcons} alt="configurações" />
            Configurações
          </a>
        </div>
      </section>
    </footer>
  );
}
