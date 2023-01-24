import { Router } from "express";
import User from "../models/User.js"

const router = Router()

router.get("/register", (req, res)=>{
    res.render("register",{
      title : "App | Register",
      isRegister : true
    })
 })
 router.post("/register", async (req, res)=>{
  const userData = {
    firstName : req.body.firstname,
    lastName : req.body.lastname,
    email: req.body.email,
    password : req.body.password
  }
  const user = await User.create(userData)
  console.log(user);
  
  res.redirect("/")
 })
 router.get("/login", (req, res)=>{
   res.render("login",{
     title : "App | Login",
     isLogin : true
   })
})
router.post("/login", (req, res)=>{
  console.log(req.body);
  res.redirect("/")
})

export default router 