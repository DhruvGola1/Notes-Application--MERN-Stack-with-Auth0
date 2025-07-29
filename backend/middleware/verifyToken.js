import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

const verifyToken = (req, res, next) => {
  checkJwt(req, res, (err) => {
    if (err) {
      if (err.name === "UnauthorizedError") {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid or missing token." });
      }
      if (err.name === "ForbiddenError") {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient scope or token claims." });
      }
      return res.status(500).json({ message: "Token verification error." });
    }

    if (req.auth && req.auth.payload && req.auth.payload.sub) {
      req.user = { sub: req.auth.payload.sub };
      next();
    } else {
      res
        .status(403)
        .json({ message: "Forbidden: Token payload missing 'sub' claim." });
    }
  });
};

export default verifyToken;
