import { Form, Link, redirect, useActionData } from "react-router-dom";
import "./styles.css";
import { authClient } from "../../api/auth";

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
    <div className="main-container ">
      <section className="login-container">
        <div className="divisao">
          <p>Login</p>
          <div className="linha"></div>
        </div>

        <Form method="post" className="login-form">
          <div className="input-container">
            <p>Email</p>
            <input type="text" id="email_input" name="email" />
          </div>

          <div className="input-container">
            <p>Senha</p>
            <input type="password" id="senha_input" name="password" />
          </div>

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
      </section>
    </div>
  );
}
