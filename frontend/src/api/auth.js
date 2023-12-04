import { api } from "./api";

export function login(email, password) {
  return api.post("auth/login", { json: { email, password } }).json();
}

export function signIn(username, avatar, email, password) {
  return api
    .post("auth/register", { json: { username, avatar, email, password } })
    .json();
}

export function getLoggedUser() {
  return api.get("auth/me").json();
}

export const authClient = {
  user: null,
  isAuthenticated: async function () {
    const user = await this.getLoggedUser();
    return user !== null;
  },
  login: async function (email, password) {
    const { token } = await login(email, password);
    localStorage.setItem("login:token", token);
    const user = await getLoggedUser();
    this.user = user;
  },
  register: async function (username, avatar, email, password) {
    await signIn(username, avatar, email, password);
    await this.login(email, password);
  },
  getLoggedUser: async function () {
    if (this.user) {
      return this.user;
    }

    try {
      const user = await getLoggedUser();
      this.user = user;

      return user;
    } catch {
      return null;
    }
  },
  logout: function () {
    this.user = null;
    localStorage.removeItem("login:token");
  },
};
