export class HttpError extends Error {
  constructor() {
    super("http error");
    this.name = this.constructor.name;
    this.status = 400;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(req, res) {
    return {
      type: `https://http.cat/${this.status}`,
      title: this.title,
      status: this.status,
      detail: this.message,
      instance: this.instance,
    };
  }
}
