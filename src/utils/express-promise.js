export function wrap(middleware) {
  return async (req, res, next) => {
    try {
      const response = await middleware(req, res);
      if (response) return res.json(response);
    } catch (e) {
      next(e);
    }
  };
}
