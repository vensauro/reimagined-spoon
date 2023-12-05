import { Form, redirect, useActionData, useLocation } from "react-router-dom";
import { createGame } from "../../../api/games";
import { FormButton } from "../../../shared/form-button";
import { FormContainer } from "../../../shared/form-container";
import { Input } from "../../../shared/input";

import { authLoader } from "../../../shared/auth/auth-loader";
import "./styles.css";

export async function action({ request }) {
  const url = new URL(request.url);
  const redirectLink = url.searchParams.get("return");

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  for (const field in updates) {
    if (!updates[field]) {
      return {
        error: `Necessário o campo ${field}`,
      };
    }
  }

  await createGame(updates);

  return redirect(redirectLink ?? "/");
}

export const loader = authLoader();

export function GamesCreatePage() {
  let actionData = useActionData();

  const location = useLocation();

  const search = Object.fromEntries(new URLSearchParams(location.search));

  return (
    <FormContainer title="Plataforma">
      <Form method="post" className="platform-create-container">
        <Input
          label="Nome"
          type="text"
          name="name"
          defaultValue={search.name}
        />
        <Input label="Descrição" type="text" name="description" />
        <Input label="URL da imagem" type="text" name="image" />
        <Input label="Ano de Lançamento" type="date" name="launchDate" />

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
