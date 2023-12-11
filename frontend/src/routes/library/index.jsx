import { Form, Link, useLoaderData, useSubmit } from "react-router-dom";
import { authLoader } from "../../shared/auth/auth-loader";
import { PageTitle } from "../../shared/page-title";
import "./styles.css";
import { getUserGamesByCategory, getUserLibrary } from "../../api/user-game";
import Select from "react-select";
import { getCategories } from "../../api/category";
import { useRef } from "react";

export const loader = authLoader(async ({ request }) => {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("category");

  const library = categoryId
    ? await getUserGamesByCategory(categoryId)
    : await getUserLibrary();

  const categories = await getCategories();

  return { library, categories, categoryId };
});

export function LibraryPage() {
  const { library, categories, categoryId } = useLoaderData();

  const formRef = useRef();
  const submit = useSubmit();

  return (
    <div className="library-main-container">
      <section>
        <PageTitle>Minha Biblioteca</PageTitle>
        <Form className="category-select-container" role="search" ref={formRef}>
          <Select
            isClearable
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            name="category"
            className="game-select"
            placeholder="Pesquisar por categoria"
            defaultValue={
              categoryId
                ? {
                    value: categoryId,
                    label: categories.find((e) => e.id === Number(categoryId))
                      .name,
                  }
                : undefined
            }
            onChange={() => setTimeout(() => submit(formRef.current))}
          />
        </Form>
        <div className="games-listing" id="games">
          {library.map((userGame) => (
            <Link key={userGame.id} to={`/biblioteca/${userGame.game.id}`}>
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
