import { Link, useLoaderData } from "react-router-dom";
import {
  getUserGamesByRecommendation,
  getUserGamesByStatus,
  getUserLibrary,
} from "../api/user-game";
import { authLoader } from "../shared/auth/auth-loader";
import { PageTitle } from "../shared/page-title";
import "./index.css";

export const loader = authLoader(async () => {
  const library = await getUserLibrary();
  const playingGames = await getUserGamesByStatus("Jogando");
  const beatenGames = await getUserGamesByStatus("Zerado");
  const notRecommendedGames = await getUserGamesByRecommendation(
    "Não Recomendo"
  );

  return { library, playingGames, beatenGames, notRecommendedGames };
});
export default function Index() {
  const { library, playingGames, beatenGames, notRecommendedGames } =
    useLoaderData();

  const lastGame = library?.[0];
  const recentPlaying = library.slice(1, 5);

  return (
    <div className="library-main-container">
      <section id="ultimo_jogo">
        <PageTitle>Ultimo Jogo</PageTitle>

        <Link to={`/biblioteca/${lastGame.game.id}`} id="HOGW">
          <img src={lastGame.game.image} alt="Ultimo a ser jogado" />
        </Link>

        <div id="botao-jogar">
          <a href="#">Jogar Agora</a>
        </div>
      </section>

      <section id="mais">
        <PageTitle>Mais Jogados no Momento</PageTitle>

        <div className="home-game-container-small">
          {recentPlaying.length === 0 && (
            <p className="home-state-zero-text">Sem dados recentes</p>
          )}
          {recentPlaying.map((libraryItem) => (
            <div className="home-game-card" key={libraryItem.id}>
              <Link to={`/biblioteca/${libraryItem.game.id}`}>
                <img src={lastGame.game.image} alt="" />
              </Link>
              <Link
                className="home-game-card-title"
                to={`/biblioteca/${libraryItem.game.id}`}
              >
                {libraryItem.game.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="agora">
        <PageTitle>Jogando Agora</PageTitle>

        <div className="home-game-container-big">
          {playingGames.length === 0 && (
            <p className="home-state-zero-text">Sem dados recentes</p>
          )}
          {playingGames.map((libraryItem) => (
            <div className="home-game-card" key={libraryItem.id}>
              <Link to={`/biblioteca/${libraryItem.game.id}`}>
                <img src={lastGame.game.image} alt="" />
              </Link>
              <Link
                className="home-game-card-title"
                to={`/biblioteca/${libraryItem.game.id}`}
              >
                {libraryItem.game.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="zerado">
        <PageTitle>Zerados</PageTitle>

        <div className="home-game-container-big">
          {beatenGames.length === 0 && (
            <p className="home-state-zero-text">Sem dados recentes</p>
          )}
          {beatenGames.map((libraryItem) => (
            <div className="home-game-card" key={libraryItem.id}>
              <Link to={`/biblioteca/${libraryItem.game.id}`}>
                <img src={lastGame.game.image} alt="" />
              </Link>
              <Link
                className="home-game-card-title"
                to={`/biblioteca/${libraryItem.game.id}`}
              >
                {libraryItem.game.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="categorias">
        <PageTitle>Categorias</PageTitle>

        <div className="home-game-container-big">
          <div className="home-game-card">
            <a href="#">
              <img src="/Categorias/adventure.png" alt="" />
            </a>
            <a className="home-game-card-title" href="#">
              Aventura
            </a>
          </div>

          <div className="home-game-card">
            <a href="#">
              <img src="/Categorias/ação.png" alt="" />
            </a>
            <a className="home-game-card-title" href="#">
              Ação
            </a>
          </div>

          <div className="home-game-card">
            <a href="#">
              <img src="/Categorias/fighting_martial_arts.png" alt="" />
            </a>
            <a className="home-game-card-title" href="#">
              Luta
            </a>
          </div>

          <div className="home-game-card">
            <a href="#">
              <img src="/Categorias/rpg.png" alt="" />
            </a>
            <a className="home-game-card-title" href="#">
              R.P.G
            </a>
          </div>
        </div>
      </section>

      <section id="nrecomendado">
        <PageTitle>Não Recomendados</PageTitle>

        <div className="home-game-container-big">
          {notRecommendedGames.length === 0 && (
            <p className="home-state-zero-text">Sem dados recentes</p>
          )}
          {notRecommendedGames.map((libraryItem) => (
            <div className="home-game-card" key={libraryItem.id}>
              <Link to={`/biblioteca/${libraryItem.game.id}`}>
                <img src={lastGame.game.image} alt="" />
              </Link>
              <Link
                className="home-game-card-title"
                to={`/biblioteca/${libraryItem.game.id}`}
              >
                {libraryItem.game.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
