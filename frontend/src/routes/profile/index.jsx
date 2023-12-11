import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import "./styles.css";
import { FormContainer } from "../../shared/form-container";
import { Input } from "../../shared/input";
import { authClient, deleteUser, updateUser } from "../../api/auth";
import { authLoader } from "../../shared/auth/auth-loader";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const avatar = formData.get("avatar");

  await updateUser({
    email,
    password,
    username,
    avatar,
  });

  return redirect("/");
}

export const loader = authLoader(async () => {
  const user = await authClient.getLoggedUser();
  return { user };
});

export function ProfilePage() {
  const { user } = useLoaderData();
  let actionData = useActionData();
  const navigate = useNavigate();

  async function onDeleteUser() {
    const deletedUser = await deleteUser();
    console.log({ deletedUser });
    authClient.logout();
    navigate("/");
  }
  // console.log(user);
  return (
    <FormContainer title="Configuração da conta">
      <Form method="post" className="platform-create-container">
        <Input
          label="Nickname"
          type="text"
          name="username"
          defaultValue={user.username}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={user.email}
        />
        <Input
          label="Url do Avatar"
          type="text"
          name="avatar"
          defaultValue={user.avatar}
        />
        <Input label="Senha" type="password" name="password" />

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div className="profile-button-submit-container">
          <button
            className="primary-button secondary-bg"
            type="button"
            onClick={onDeleteUser}
          >
            Excluir conta
          </button>

          <button className="create-game-button" type="submit">
            Alterar dados da conta
          </button>
        </div>
      </Form>
      <Form method="post" action="/logout" className="profile-logout-container">
        <button className="primary-button">Fazer Logout</button>
      </Form>
    </FormContainer>
  );
}
