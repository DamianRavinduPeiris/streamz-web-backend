import express, { Express, Request, Response } from "express";
import { generateJWT } from "../auth/Auth";
import adminType from "../types/AdminType";
import Admin from "../models/Admin";
const adminController = express.Router();

adminController.use(express.json());
adminController.post('/signup',async(req:Request,res:Response)=>{
    try {
        let response = await Admin.create(req.body);
        return generateJWT(req, res, req.body);
        
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
    

})


export default adminController;
