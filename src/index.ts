import express, { Express,Request,Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

mongoose.connect("mongodb+srv://damianpeiris:"+process.env.MONGODB_PASSWORD+"@streamzdb.qcqbh9t.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to database!")
}).catch((er)=>{
  console.log("Something went wrong! : "+er)
})



