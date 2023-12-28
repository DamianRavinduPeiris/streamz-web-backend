import express, { Express,Request,Response } from "express";
const userController = express.Router();
userController.get('/',(req:Request,res:Response)=>{
    res.json({"message" : "Fuck you All!"})
})
export default userController;
