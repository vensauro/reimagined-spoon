import { api } from "./api";

export function getPlatforms() {
  return api.get("platforms").json();
}

export function createPlatform(json) {
  return api.post("platforms", { json }).json();
}

export function deletePlatform(id) {
  return api.delete(`platforms/${id}`).json();
}
