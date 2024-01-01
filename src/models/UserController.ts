import express, { Express, Request, Response } from "express";
import { generateJWT ,authenticateToken} from "../auth/Auth";
import User from "./User";
import UserType from "../types/UserTypes";
const userController = express.Router();
userController.use(express.json());
userController.get("/", (req: Request, res: Response) => {
  res.json({ message: "Fuck you All!" });
});

userController.post("/saveUser", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const data = await User.create(req.body);
    return res
      .status(201)
      .json({ msg: "User Successfully Saved!", isSaved: true });
  } catch (error) {
    console.log("An Error occurred : " + error);
    return res
      .status(200)
      .json({ msg: "An error occurred!" + error, isSaved: false });
  }
});

userController.get("/search", async (req: Request, res: Response) => {
  try {
    const email: string =
      typeof req.query.email === "string" ? req.query.email : "";
    const usersList = await User.find({ email });
    if (usersList.length > 0) {
      console.log("User Found!");
      return res.status(200).json({
        msg: "User Successfully retrieved!",
        data: usersList,
        isExists: true,
      });
    } else {
      console.log("User Not found!");
      return res
        .status(200)
        .json({ msg: "User not found!", data: null, isExists: false });
    }
  } catch (error) {
    console.log("An error occurred : " + error);
    return res.status(500).json({
      msg: "Something went wrong : " + error,
      data: null,
      isExists: false,
    });
  }
});
userController.get("/test", (req: Request, res: Response) => {
  const user: UserType = req.body;
  return generateJWT(req, res, user);
});
userController.get("/testAuth", authenticateToken, (req, res) => {
  return res.status(200).json({ msg: "Token verified!" });
});
export default userController;
