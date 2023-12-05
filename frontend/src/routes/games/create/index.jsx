import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
  useRevalidator,
} from "react-router-dom";
import { addCategoryToGame, createGame } from "../../../api/games";
import { FormButton } from "../../../shared/form-button";
import { FormContainer } from "../../../shared/form-container";
import { Input } from "../../../shared/input";

import CreatableSelect from "react-select/creatable";
import { authLoader } from "../../../shared/auth/auth-loader";
import { createCategory, getCategories } from "../../../api/category";

import "./styles.css";

export async function action({ request }) {
  const url = new URL(request.url);
  const redirectLink = url.searchParams.get("return");

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const categoriesIds = formData.getAll("categoriesIds");

  for (const field in updates) {
    if (!updates[field]) {
      return {
        error: `Necessário o campo ${field}`,
      };
    }
  }

  const game = await createGame(updates);
  await Promise.all(
    categoriesIds.map((categoryId) => addCategoryToGame(game.id, categoryId))
  );

  return redirect(redirectLink ?? "/");
}

export const loader = authLoader(async () => {
  const categories = await getCategories();

  return { categories };
});

export function GamesCreatePage() {
  const { categories } = useLoaderData();
  let actionData = useActionData();
  let revalidator = useRevalidator();

  const location = useLocation();

  const search = Object.fromEntries(new URLSearchParams(location.search));

  async function onCreateCategory(categoryName) {
    await createCategory({ name: categoryName, description: categoryName });
    revalidator.revalidate();
  }

  return (
    <FormContainer title="Plataforma">
      <Form method="post" className="platform-create-container">
        <Input
          label="Nome"
          type="text"
          name="name"
          defaultValue={search.name}
        />
        <div className="input-container">
          <p>Descrição</p>
          <textarea type="text" name="description" rows={13} />
        </div>

        <Input label="URL da imagem" type="text" name="image" />
        <Input label="Ano de Lançamento" type="date" name="launchDate" />
        <div className="input-container">
          <p>Categorias</p>
          <CreatableSelect
            isClearable
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            onCreateOption={onCreateCategory}
            name="categoriesIds"
            isMulti
            className="game-select"
            placeholder="Selecione as categorias"
          />
        </div>

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div className="platform-button-submit-container">
          <FormButton>Criar Jogo</FormButton>
        </div>
      </Form>
    </FormContainer>
  );
}
