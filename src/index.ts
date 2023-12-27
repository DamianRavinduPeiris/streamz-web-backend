import express, { Express,Request,Response } from "express";
const app: Express = express();
app.listen(2000, () => {
  console.log("server is running on port 2000!");
});


app.get('/',(req:Request,res:Response)=>{
    res.json({message:"Hello World"})

})