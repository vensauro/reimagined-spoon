import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { getGame } from "../../../api/games";
import { deleteGameFromLibrary, getUserGame } from "../../../api/user-game";
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

export async function action({ params }) {
  await deleteGameFromLibrary(params.gameId);
  return redirect("/biblioteca");
}

export function LibraryGame() {
  const { gameLibrary, game } = useLoaderData();

  // console.log(gameLibrary);
  console.log(game);
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
              Plataforma : <span>{gameLibrary.platform.name}</span>
            </li>
            <li className="game-detail-info-item">
              Nota : <span>{gameLibrary.rate}</span>
            </li>

            <li className="game-detail-info-item">
              Status : <span>{gameLibrary.status}</span>
            </li>
            <li className="game-detail-info-item">
              Categorias :{" "}
              <span>{game.categories.map((e) => e.name).join(", ")}</span>
            </li>
            <li className="game-detail-info-item">
              Progresso : <span>{gameLibrary.progress}</span>
            </li>
            <li className="game-detail-info-item">
              Recomendo : <span>{gameLibrary.recommendation}</span>
            </li>
            <li className="game-detail-info-item">
              Ano de Lançamento : <span>{formatDate(game.launchDate)}</span>
            </li>
            <li className="game-detail-info-item">
              Versão : <span>{gameLibrary.mediaType}</span>
            </li>
          </ul>

          <aside>
            <h2>Descrição</h2>
            <p id="game-description">{game.description}</p>
          </aside>
        </article>
      </section>
      <section className="game-detail-button-container">
        <Link className="primary-button" to={`/biblioteca/${game.id}/editar`}>
          Editar Jogo
        </Link>
        <Form method="post">
          <button type="submit" className="primary-button secondary-bg" href="">
            Remover Jogo
          </button>
        </Form>
      </section>
    </div>
  );
}

function formatDate(stringDate) {
  return stringDate.split("-").reverse().join("/");
  // const date = new Date(stringDate);
  // const day = String(date.getDay()).padStart(2, "0");
  // const month = String(date.getMonth()).padStart(2, "0");
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
}
