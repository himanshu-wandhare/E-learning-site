import jwt from "jsonwebtoken";

export const requiresLogIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};
