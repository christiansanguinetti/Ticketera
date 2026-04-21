import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("Access denied. No token provided");
    err.status = 401;
    return next(err);
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
}