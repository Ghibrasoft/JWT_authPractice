import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(
      token,
      "jwt_secret_key",
      (err: jwt.VerifyErrors | null, decodedToken: JwtPayload | any) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        } else {
          console.log(decodedToken);
          next();
          res.redirect("/profile");
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};
