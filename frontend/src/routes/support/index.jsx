import { PageTitle } from "../../shared/page-title";
import whatsappIcon from "../../assets/watts.png";

import "./styles.css";

export function SupportPage() {
  return (
    <div className="library-main-container">
      <PageTitle>Principais dúvidas</PageTitle>
      <article>
        <aside className="faq-container">
          <h2>Ajuda 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            voluptatum quas, quaerat quod quam tempore, ab dolorem quia
            explicabo illo molestiae sunt quisquam, eaque sint dolore possimus
            accusantium odio voluptatem.
          </p>
        </aside>

        <aside className="faq-container">
          <h2>Ajuda 2</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            voluptatum quas, quaerat quod quam tempore, ab dolorem quia
            explicabo illo molestiae sunt quisquam, eaque sint dolore possimus
            accusantium odio voluptatem.
          </p>
        </aside>

        <aside className="faq-container">
          <h2>Ajuda 3</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            voluptatum quas, quaerat quod quam tempore, ab dolorem quia
            explicabo illo molestiae sunt quisquam, eaque sint dolore possimus
            accusantium odio voluptatem.
          </p>
        </aside>

        <aside className="faq-container">
          <h2>Ajuda 3</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            voluptatum quas, quaerat quod quam tempore, ab dolorem quia
            explicabo illo molestiae sunt quisquam, eaque sint dolore possimus
            accusantium odio voluptatem.
          </p>
        </aside>

        <aside className="faq-container">
          <h2>Ajuda 4</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            voluptatum quas, quaerat quod quam tempore, ab dolorem quia
            explicabo illo molestiae sunt quisquam, eaque sint dolore possimus
            accusantium odio voluptatem.
          </p>
        </aside>

        <aside className="suporte">
          <h2>Ainda com dúvida ? , fale com o nosso suporte.</h2>
          <div className="suporte-links">
            <a href="https://wa.me/5571997227237">Falar com o Suporte</a>
            <a href="https://wa.me/5571997227237">
              <img src={whatsappIcon} alt="" />
            </a>
          </div>
        </aside>
      </article>
    </div>
  );
}
