import { HttpError } from "./http-error.js";

export class BadRequest extends HttpError {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.status = 400;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(req, res) {
    return {
      type: `https://http.cat/${this.status}`,
      title: "BAD_REQUEST",
      status: this.status,
      detail: ``,
      instance: req.url,
    };
  }
}

export function badRequest() {
  return new BadRequest();
}
