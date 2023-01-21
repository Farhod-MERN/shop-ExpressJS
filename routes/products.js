import { Router } from "express";

const router = Router()

router.get('/', (req, res)=>{
    res.render("index")
 })
 router.get("/products", (req, res)=>{
    res.render("products")
 })
 router.get("/login", (req, res)=>{
    res.render("login")
 })

export default router