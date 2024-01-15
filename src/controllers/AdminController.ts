import express, { Express, Request, Response } from "express";
import { authenticateToken, generateJWT } from "../auth/Auth";
import adminType from "../types/AdminType";
import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import hashPassword from "../util/PasswordHasher";
const adminController = express.Router();

adminController.use(express.json());
adminController.post("/signup", async (req: Request, res: Response) => {
  try {
    let hashedPW = await hashPassword(req.body.password, 10);
    req.body.password = hashedPW;
    await Admin.create(req.body);
    return generateJWT(req, res, req.body);
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
});
adminController.get(
  "/search",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      let adminsList = await Admin.find({ email: req.query.email });
      if (adminsList.length > 0) {
        return res
          .status(200)
          .json({ msg: "Admin Found!", data: adminsList, isExists: true });
      } else {
        return res
          .status(200)
          .json({ msg: "Admin Not Found!", data: null, isExists: false });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
adminController.delete(
  "/delete",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      let response = await Admin.findOneAndDelete({ email: req.query.email });
      if (response) {
        return res
          .status(200)
          .json({ msg: "Admin Deleted Successfully!", isDeleted: true });
      } else {
        return res
          .status(200)
          .json({ msg: "Admin Not Found!", isDeleted: false });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default adminController;
