import express, { Express, Request, Response } from "express";
import User from "./User";
const userController = express.Router();
userController.use(express.json());
userController.get("/", (req: Request, res: Response) => {
  res.json({ message: "Fuck you All!" });
});

userController.post("/save", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const data = await User.create(req.body);
    return res.status(201).json({ msg: "User Successfully Saved!" });
  } catch (error) {
    console.log("An Error occurred : " + error);
    return res.status(500).json({ msg: "An error occurred!" + error });
  }
});

userController.get("/search", async (req: Request, res: Response) => {
  try {
    const userName: string =
      typeof req.query.username === "string" ? req.query.username : "";
    const usersList = await User.find({ userName });
    if (usersList.length > 0) return res.status(302).json(usersList);
    else {
      return res.status(404).json({ msg: "User not found!" });
    }
  } catch (error) {
    console.log('An error occurred : '+error)
    return res.status(500).json({msg: "Something went wrong : "+error})
  }
});

export default userController;
