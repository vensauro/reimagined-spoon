import { api } from "./api";

export function getCategories() {
  return api.get("categories").json();
}

export function createCategory(json) {
  return api.post("categories", { json }).json();
}

export function updateCategory(categoryId, json) {
  return api.put(`categories/${categoryId}`, { json }).json();
}

export function deleteCategory(categoryId) {
  return api.delete(`categories/${categoryId}`).json();
}
