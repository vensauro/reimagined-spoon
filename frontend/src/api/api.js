import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://localhost:3000",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("login:token");
        if (token) request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
});
