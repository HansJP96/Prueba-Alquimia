import express from "express";

const authRouter = express.Router()

authRouter.get("/",(req,res)=>{
    res.send("este es el auth")
})

export default authRouter