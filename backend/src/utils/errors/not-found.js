import { HttpError } from "./http-error.js";

export class NotFound extends HttpError {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.status = 404;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(req, res) {
    return {
      type: `https://http.cat/${this.status}`,
      title: "NOT_FOUND",
      status: this.status,
      detail: `The resource ${req.url} have not be founded`,
      instance: req.url,
    };
  }
}

export function notFound() {
  return new NotFound();
}
