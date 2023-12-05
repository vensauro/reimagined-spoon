import { api } from "./api";

export function getUserLibrary() {
  return api.get("user-games").json();
}

export function getUserGame(gameId) {
  return api.get(`user-games/${gameId}`).json();
}

export function addGameToLibrary(json) {
  return api.post("user-games", { json }).json();
}

export function updateUserGame(gameId, json) {
  return api.put(`user-games/${gameId}`, { json }).json();
}

export function deleteGameFromLibrary(gameId) {
  return api.delete(`user-games/${gameId}`).json();
}
