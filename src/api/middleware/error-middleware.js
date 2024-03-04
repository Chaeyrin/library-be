import { ResponseError } from "../utils/index.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    const errors = { status: err.status, errors: err.message };
    console.log("🚀 ~ ------ ResponseError ------>>>", errors);
    res.status(err.status).json({ errors: err.message }).end();
  } else {
    console.log("🚀 ~ --- InternalServerError --->>>", err);
    res.status(500).json({ errors: err.message }).end();
  }
};

export { errorMiddleware };
