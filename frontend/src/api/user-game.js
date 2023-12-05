import { api } from "./api";

export function getUserLibrary() {
  return api.get("user-games").json();
}

export function getUserGame(gameId) {
  return api.get(`user-games/${gameId}`).json();
}

export function getUserGamesByStatus(status) {
  return api.get(`user-games/status`, { searchParams: { status } }).json();
}

export function getUserGamesByRecommendation(recommendation) {
  return api
    .get(`user-games/recommendation`, { searchParams: { recommendation } })
    .json();
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
