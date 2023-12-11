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
  const progress = Number(updates.progress);
  if (Number.isNaN(rate) || Number.isNaN(progress)) {
    return {
      error: "Nota de avaliação e Progresso deve ser número",
    };
  }

  await addGameToLibrary({ ...updates, rate, progress });

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
        <div className="input-container">
          <p>Status</p>
          <Select
            isClearable
            options={[
              { value: "Jogado", label: "Jogado" },
              { value: "Jogando", label: "Jogando" },
              { value: "Zerado", label: "Zerado" },
              { value: "Nunca Jogado", label: "Nunca Jogado" },
            ]}
            name="status"
            className="input-select"
            placeholder="Selecione o status"
          />
        </div>
        <Input label="Avaliação" type="number" name="rate" />
        <Input label="Progresso" type="number" name="progress" />
        <div className="input-container">
          <p>Recomendo o Jogo</p>
          <Select
            isClearable
            options={[
              { value: "Recomendo", label: "Sim" },
              { value: "Não Recomendo", label: "Não" },
              { value: "Avaliando", label: "Em avaliação" },
            ]}
            name="recommendation"
            className="input-select"
            placeholder="Qual a sua recomendação"
          />
        </div>
        <div className="input-container">
          <p>Versão do jogo</p>
          <Select
            isClearable
            options={[
              { value: "Física", label: "Física" },
              { value: "Digital", label: "Digital" },
            ]}
            name="mediaType"
            className="input-select"
            placeholder="Selecione a mídia do jogo"
          />
        </div>

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div className="platform-button-submit-container add-library-submit-container">
          <button className="create-game-button">Adicionar Jogo</button>
        </div>
      </Form>
    </FormContainer>
  );
}
