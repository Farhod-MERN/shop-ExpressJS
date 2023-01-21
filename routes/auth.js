import { Router } from "express";

const router = Router()

router.get("/register", (req, res)=>{
    res.render("register")
 })
 router.get("/add", (req, res)=>{
    res.render("add")
 })

export default router