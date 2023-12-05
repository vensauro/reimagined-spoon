import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { authLoader } from "../../../shared/auth/auth-loader";
import { FormContainer } from "../../../shared/form-container";
import { Input } from "../../../shared/input";
import CreatableSelect from "react-select/creatable";
import "./styles.css";
import { getGames } from "../../../api/games";
import { addGameToLibrary } from "../../../api/user-game";
import { getPlatforms } from "../../../api/platforms";
import Select from "react-select";

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  if (!updates.gameId) {
    return {
      error: "Selecione o jogo!",
    };
  }

  if (!updates.platformId) {
    return {
      error: "Selecione a plataforma!",
    };
  }

  const rate = Number(updates.rate);
  if (Number.isNaN(rate)) {
    return {
      error: "Nota de avaliação deve ser número",
    };
  }

  await addGameToLibrary({ ...updates, rate });

  return redirect("/biblioteca");
}

export const loader = authLoader(async () => {
  const games = await getGames();
  const platforms = await getPlatforms();
  return { games, platforms };
});

export function AddGameToLibraryPage() {
  const { games, platforms } = useLoaderData();
  let actionData = useActionData();
  const navigate = useNavigate();

  function onCreateOption(name) {
    navigate(`/games/criar?name=${name}&return=/biblioteca/adicionar`);
  }

  return (
    <FormContainer title="Adicionar Jogo">
      <Form method="post" className="platform-create-container">
        <div className="input-container">
          <p>Jogo</p>
          <CreatableSelect
            isClearable
            options={games.map((game) => ({
              value: game.id,
              label: game.name,
            }))}
            onCreateOption={onCreateOption}
            name="gameId"
            className="game-select"
            placeholder="Selecione o jogo"
          />
        </div>
        <div className="input-container">
          <p>Plataforma</p>
          <Select
            isClearable
            options={platforms.map((platform) => ({
              value: platform.id,
              label: platform.name,
            }))}
            name="platformId"
            className="input-select"
            placeholder="Selecione a plataforma"
          />
        </div>
        {/* <div className="input-container">
          <p>Plataforma</p>
          <Select
            isClearable
            options={[
              { value: "asdas", label: "Chocolate" },
              { value: "1234", label: "Strawberry" },
              { value: "llll", label: "Vanilla" },
            ]}
            name="platformId"
            className="input-select"
            placeholder="Selecione a plataforma"
          />
        </div> */}
        <Input label="Avaliação" type="text" name="rate" />

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div className="platform-button-submit-container">
          <button className="create-game-button">Adicionar Jogo</button>
        </div>
      </Form>
    </FormContainer>
  );
}
