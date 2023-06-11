import express, { Request, Response } from "express";
import { Express } from "express";
import cors from "cors";
import Users from "./models/Users";
import AuthRoutes from "./routes/authRoutes";

const localhost_VITE = "http://localhost:5173";
const app: Express = express();
app.use(express.json());
app.use(cors({ origin: localhost_VITE }));

async function addModel() {
  await Users.sync();
  console.log("Database sync success!");
}
addModel();

// GET all users
app.get("/Users", async (req: Request, res: Response) => {
  try {
    const allUsers = await Users.findAll();
    res.json(allUsers);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(AuthRoutes);

app.listen(3001, () => {
  console.log("Server is running on 3001");
});
