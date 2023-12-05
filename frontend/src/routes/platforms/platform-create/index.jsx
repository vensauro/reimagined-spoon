import { Form, redirect, useActionData } from "react-router-dom";
import { authClient } from "../../../api/auth";
import { FormContainer } from "../../../shared/form-container";
import { Input } from "../../../shared/input";
import "./styles.css";
import { FormButton } from "../../../shared/form-button";
import { createPlatform } from "../../../api/platforms";

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  for (const field in updates) {
    if (!updates[field]) {
      return {
        error: `Necessário o campo ${field}`,
      };
    }
  }

  await createPlatform(updates);

  return redirect("/plataformas");
}

export async function loader() {
  if (!(await authClient.isAuthenticated())) {
    return redirect("/login");
  }

  return null;
}

export function PlatformCreate() {
  let actionData = useActionData();
  return (
    <FormContainer title="Plataforma">
      <Form method="post" className="platform-create-container">
        <Input label="Nome" type="text" name="name" />
        <Input label="URL da imagem" type="text" name="image" />
        <Input label="Link" type="url" name="link" />

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div className="platform-button-submit-container">
          <FormButton>Criar Plataforma</FormButton>
        </div>
      </Form>
    </FormContainer>
  );
}
