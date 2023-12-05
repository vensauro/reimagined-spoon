import { Form, Link, redirect, useActionData } from "react-router-dom";
import { authClient } from "../../api/auth";
import "./styles.css";
import { FormContainer } from "../../shared/form-container";
import { Input } from "../../shared/input";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  // const remember = formData.get("remember");

  if (!email) {
    return {
      error: "Você precisa de um email para logar",
    };
  }

  if (!password) {
    return {
      error: "Você precisa de uma senha para logar",
    };
  }

  try {
    await authClient.login(email, password);
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

export function LoginPage() {
  let actionData = useActionData();
  return (
    <FormContainer title={"Login"}>
      <Form method="post" className="login-form">
        <Input label="Email" type="text" name="email" />
        <Input label="Senha" type="password" name="password" />

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div id="box_lembrar">
          <input type="checkbox" id="lembrarsenha" name="remember" />
          <label htmlFor="lembrarsenha">Lembrar Senha</label>
        </div>

        <div className="register-submit-container">
          <button className="auth-primary-button" type="submit">
            Login
          </button>
          <Link to="#" className="auth-link">
            Esqueceu a senha ?
          </Link>
          <Link to="/cadastro" className="auth-link">
            Ainda Não tem cadastro , Clique aqui !
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
}
