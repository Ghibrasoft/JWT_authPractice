import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import Users from "../models/Users";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new User
    const newUser = await Users.create({ username, password: hashedPassword });

    console.log(newUser);

    res.status(201).json({ newUser });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ Error: "Registration failed" });
  }
});

// login
router
  .route("/login")
  .get(async (req: Request, res: Response) => {
    // Handle GET request for login page
    try {
      const { username } = req.body;
      const user = await Users.findOne({ where: { username } });

      if (!user) return res.status(404).json({ Error: "USer not found" });

      // return only necessary user information
      const userData = {
        id: user.id,
        username: user.username,
      };
      res.json(userData);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      // find the user by username
      const user = await Users.findOne({ where: { username } });

      if (!user) return res.status(404).json({ Error: "User not found" });

      // check if password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res.status(401).json({ Error: "Invalid password" });

      // generate JWT
      const token = jwt.sign({ userId: user.id }, "jwt_secret_key");
      const resData = {
        id: user.id,
        token,
      };
      // set JWT token as a cookie
      res.cookie("jwt", token, { httpOnly: true });

      res.json(resData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: "Login failed" });
    }
  });

// profile route
router.get("/profile/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currUser = await Users.findOne({ where: { id } });

    if (currUser) {
      console.log("login success!");
      res.json(currUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// protected route
// router.get("/protected", requireAuth, async (req: Request, res: Response) => {
//   res.json({ message: "Protected route accessed successfully!" });
//   res.redirect("/profile");
// });

export default router;
