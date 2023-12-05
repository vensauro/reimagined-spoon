import { Form, Link, redirect, useActionData } from "react-router-dom";
import "./styles.css";
import { authClient } from "../../api/auth";
import { FormContainer } from "../../shared/form-container";
import { Input } from "../../shared/input";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const avatar = formData.get("avatar");

  if (!email) {
    return {
      error: "Você precisa de um email para se registrar",
    };
  }

  if (!password) {
    return {
      error: "Você precisa de uma senha para se registrar",
    };
  }

  if (!username) {
    return {
      error: "Você precisa de um nickname para se registrar",
    };
  }

  try {
    await authClient.register(username, avatar, email, password);
  } catch (err) {
    console.log(err);
    return {
      error: "Credenciais invalidas",
    };
  }

  return redirect("/");
}

export async function loader() {
  if (await authClient.isAuthenticated()) {
    return redirect("/");
  }

  return null;
}

export function RegisterPage() {
  let actionData = useActionData();
  return (
    <FormContainer title="Cadastro">
      <Form method="post" className="login-form">
        <Input label="Nickname" type="text" name="username" />
        <Input label="Avatar url" type="text" name="avatar" />
        <Input label="Email" type="email" name="email" />
        <Input label="Senha" type="password" name="password" />
        <Input label="Repetir senha" type="password" name="repeat_password" />

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div className="register-submit-container">
          <button className="auth-primary-button" type="submit">
            Cadastro
          </button>
          <Link to="/login" className="auth-link">
            Fazer Login
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
}
