import { Link, useLoaderData } from "react-router-dom";
import { authLoader } from "../../shared/auth/auth-loader";
import { PageTitle } from "../../shared/page-title";
import "./styles.css";
import { getUserLibrary } from "../../api/user-game";

export const loader = authLoader(async () => {
  const library = await getUserLibrary();

  return { library };
});

export function LibraryPage() {
  const { library } = useLoaderData();
  return (
    <div className="library-main-container">
      <section>
        <PageTitle>Minha Biblioteca</PageTitle>
        <div className="games-listing" id="games">
          {library.map((userGame) => (
            <Link key={userGame.id} to="/biblioteca/2">
              <div className="game-card">
                <img
                  className="game-library-image"
                  src={userGame.game.image}
                  alt=""
                />
                <span className="library-game-title">{userGame.game.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Link className="create-game-button" to="/biblioteca/adicionar">
        Cadastrar Novo Jogo
      </Link>
    </div>
  );
}
