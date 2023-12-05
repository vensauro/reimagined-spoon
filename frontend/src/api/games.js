import { api } from "./api";

export function getGames() {
  return api.get("games").json();
}

export function getGame(gameId) {
  return api.get(`games/${gameId}`).json();
}

export function createGame(json) {
  return api.post("games", { json }).json();
}

export function deleteGame(id) {
  return api.delete(`games/${id}`).json();
}
