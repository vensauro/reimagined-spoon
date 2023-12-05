import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { getGames } from "../../../api/games";
import { getPlatforms } from "../../../api/platforms";
import { getUserGame, updateUserGame } from "../../../api/user-game";
import { authLoader } from "../../../shared/auth/auth-loader";
import { FormContainer } from "../../../shared/form-container";
import { Input } from "../../../shared/input";
import "./styles.css";

export async function action({ request, params }) {
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

  await updateUserGame(params.gameId, { ...updates, rate, progress });

  return redirect(`/biblioteca/${params.gameId}`);
}

export const loader = authLoader(async ({ params }) => {
  const gameLibrary = await getUserGame(params.gameId);
  if (!gameLibrary) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const games = await getGames();
  const platforms = await getPlatforms();

  return { games, platforms, gameLibrary };
});

const recommendationOptions = [
  { value: "Recomendo", label: "Sim" },
  { value: "Não Recomendo", label: "Não" },
  { value: "Avaliando", label: "Em avaliação" },
];

export function EditLibraryGamePage() {
  const { games, platforms, gameLibrary } = useLoaderData();
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
            defaultValue={{
              value: gameLibrary.game.id,
              label: gameLibrary.game.name,
            }}
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
            defaultValue={{
              value: gameLibrary.platform.id,
              label: gameLibrary.platform.name,
            }}
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
            defaultValue={{
              value: gameLibrary.status,
              label: gameLibrary.status,
            }}
          />
        </div>
        <Input
          label="Avaliação"
          type="number"
          name="rate"
          defaultValue={gameLibrary.rate}
        />
        <Input
          label="Progresso"
          type="number"
          name="progress"
          defaultValue={gameLibrary.progress}
        />
        <div className="input-container">
          <p>Recomendo o Jogo</p>
          <Select
            isClearable
            options={recommendationOptions}
            name="recommendation"
            className="input-select"
            placeholder="Qual a sua recomendação"
            defaultValue={{
              value: gameLibrary.recommendation,
              label: recommendationOptions.find(
                (e) => e.value === gameLibrary.recommendation
              ).label,
            }}
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
            defaultValue={{
              label: gameLibrary.mediaType,
              value: gameLibrary.mediaType,
            }}
          />
        </div>

        {actionData?.error && (
          <div className="error-container">
            <p>{actionData.error}</p>
          </div>
        )}

        <div className="platform-button-submit-container">
          <button className="create-game-button">Editar Jogo</button>
        </div>
      </Form>
    </FormContainer>
  );
}
