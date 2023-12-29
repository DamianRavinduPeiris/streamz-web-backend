import express, { Express, Request, Response } from "express";
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
      .status(500)
      .json({ msg: "An error occurred!" + error, isSaved: false });
  }
});

userController.get("/search", async (req: Request, res: Response) => {
  try {
    const email: string =
      typeof req.query.email === "string" ? req.query.email : "";
    const usersList = await User.find({ email });
    if (usersList.length > 0) return res.status(302).json({msg : "User Successfully retrieved!",data : usersList,isExists : true});
    else {
      return res.status(404).json({ msg: "User not found!" ,data:null,isExists : false});
    }
  } catch (error) {
    console.log("An error occurred : " + error);
    return res.status(500).json({ msg: "Something went wrong : " + error });
  }
});

export default userController;
