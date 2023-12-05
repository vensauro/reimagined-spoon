import { useLoaderData } from "react-router-dom";
import { getGame } from "../../../api/games";
import { getUserGame } from "../../../api/user-game";
import { authLoader } from "../../../shared/auth/auth-loader";
import { PageTitle } from "../../../shared/page-title";
import "./styles.css";

export const loader = authLoader(async ({ params }) => {
  const gameLibrary = await getUserGame(params.gameId);
  if (!gameLibrary) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const game = await getGame(gameLibrary.game.id);
  return { gameLibrary, game };
});

export function LibraryGame() {
  const { gameLibrary, game } = useLoaderData();

  console.log(gameLibrary);
  return (
    <div className="game-library-detail-root">
      <section>
        <PageTitle>{game.name}</PageTitle>

        <div className="game-image-container">
          <img className="game-image" src={game.image} />
        </div>

        <article className="info">
          <ul className="game-detail-info-listing">
            <li className="game-detail-info-item">
              Plataforma : <span>{game.platform.name}</span>
            </li>
            <li className="game-detail-info-item">
              Nota : <span>{gameLibrary.rate}</span>
            </li>

            <li className="game-detail-info-item">
              Status : <span></span>
            </li>
            <li className="game-detail-info-item">
              Categoria : <span></span>
            </li>
            <li className="game-detail-info-item">
              Progresso : <span></span>
            </li>
            <li className="game-detail-info-item">
              Recomendo : <span></span>
            </li>
            <li className="game-detail-info-item">
              Ano de Lançamento : <span></span>
            </li>
            <li className="game-detail-info-item">
              Versão : <span></span>
            </li>
          </ul>

          <aside>
            <h2>Descrição</h2>
            <p id="game-description">{game.description}</p>
          </aside>
        </article>
      </section>
      <section className="game-detail-button-container">
        <a className="primary-button" href="">
          Editar Jogo
        </a>
        <a className="primary-button secondary-bg" href="">
          Remover Jogo
        </a>
      </section>
    </div>
  );
}
