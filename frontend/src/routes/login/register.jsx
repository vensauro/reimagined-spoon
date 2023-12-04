import { Form, Link, redirect } from "react-router-dom";
import "./styles.css";
import { authClient } from "../../api/auth";

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
  return (
    <div className="main-container ">
      <section className="register-container">
        <div className="divisao">
          <p>Cadastro</p>
          <div className="linha"></div>
        </div>

        <Form method="post" className="login-form">
          <div className="input-container">
            <p>Nickname</p>
            <input type="text" id="email_input" name="username" />
          </div>

          <div className="input-container">
            <p>Avatar url</p>
            <input type="url" id="email_input" name="avatar" />
          </div>

          <div className="input-container">
            <p>Email</p>
            <input type="email" id="email_input" name="email" />
          </div>

          <div className="input-container">
            <p>Senha</p>
            <input type="password" id="senha_input" name="password" />
          </div>

          <div className="input-container">
            <p>Repetir Senha</p>
            <input type="password" id="senha_input" name="password" />
          </div>

          <div className="register-submit-container">
            <button className="auth-primary-button" type="submit">
              Cadastro
            </button>
            <Link to="/login" className="auth-link">
              Fazer Login
            </Link>
          </div>
        </Form>
      </section>
    </div>
  );
}
