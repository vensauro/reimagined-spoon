import { HttpError } from "./errors/http-error.js";

export function notFoundHandler(req, res) {
  res.status(404).json({
    type: `https://http.cat/${404}`,
    title: "NOT_FOUND",
    status: 404,
    detail: `The resource ${req.url} have not be founded`,
    instance: req.url,
  });
}

export function genericErrorHandler(error, req, res, next) {
  console.error(error);

  if (error instanceof HttpError) {
    return res.status(error.status).json(error.toJSON(req, res));
  }

  return res.status(500).json({
    type: `https://http.cat/${500}`,
    title: "INTERNAL_SERVER_ERROR",
    status: 500,
    detail: `The server have a error with the resource ${
      req.url
    } and the body ${JSON.stringify(req.body)} on ${new Date().toISOString()}`,
    instance: req.url,
  });
}

export function forbidden(req, res) {
  res.status(403).json({
    type: `https://http.cat/${403}`,
    title: "FORBIDDEN",
    status: 403,
    detail: `Access to the resource ${req.url} is forbidden`,
    instance: req.url,
  });
}
