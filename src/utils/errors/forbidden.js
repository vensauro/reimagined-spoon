import { HttpError } from "./http-error.js";

export class Forbidden extends HttpError {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.status = 403;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(req, res) {
    return {
      type: `https://http.cat/${403}`,
      title: "FORBIDDEN",
      status: 403,
      detail: `Access to the resource ${req.url} is forbidden`,
      instance: req.url,
    };
  }
}
