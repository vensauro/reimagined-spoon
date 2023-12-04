import { HttpError } from "./http-error.js";

export class Unauthorized extends HttpError {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.status = 401;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(req, res) {
    return {
      type: `https://http.cat/${this.status}`,
      title: "UNAUTHORIZED",
      status: this.status,
      detail: `Access to the resource ${req.url} is unauthorized`,
      instance: req.url,
    };
  }
}

export function unauthorized() {
  return new Unauthorized();
}
