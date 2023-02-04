import { Router } from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { generateJWTToken } from "../services/token.js";
import registerMiddleware from "../middleware/register.js";
import loginMiddleware from "../middleware/login.js";

const router = Router()

router.get("/register",registerMiddleware ,(req, res)=>{

  res.render("register",{
      title : "App | Register",
      isRegister : true, 
      registerError: req.flash("registerError")
    })
 })
 router.post("/register", async (req, res)=>{

  const {email, password, firstname, lastname} = req.body

  if(!email || !password || !firstname || !lastname){
    req.flash("registerError", "All fields is required")
    res.redirect("/register")
    return
  }
  const candidate = await User.findOne({email: email})
  if(candidate){
    req.flash("registerError", "this email already exsist !")
    res.redirect("/register")
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const userData = {
    firstName : firstname,
    lastName : lastname,
    email: email,
    password : hashedPassword,
  }
  const user = await User.create(userData)
  
  const token = generateJWTToken(user._id)
  res.cookie("token", token, {httpOnly: true, secure: true})
  
  res.redirect("/")
 })


 router.get("/login",loginMiddleware ,(req, res)=>{
 
  res.render("login",{
     title : "App | Login",
     isLogin : true, 
     loginError: req.flash("loginError")
   })
})
router.post("/login", async (req, res)=>{

  const {email, password} = req.body

  if(!email || !password){
    req.flash("loginError", "All fields is required")
    res.redirect("/login")
    return
  }
  const existUser = await User.findOne({email: email})
  if(!existUser){
    req.flash("loginError", "User not found , Please try another one")
    res.redirect("/login")
    return
  }

  const isPasswordEquel = await bcrypt.compare(password, existUser.password)
  if(!isPasswordEquel){
    req.flash("loginError" ,"Your password isn't correct")
    res.redirect("/login")
    return
  }
  const token = generateJWTToken(existUser._id)
  res.cookie("token", token, {httpOnly: true, secure: true})
  console.log(existUser);
  res.redirect("/")
})

router.get("/logout",  (req, res)=>{
  res.clearCookie("token")
  res.redirect("/")
})

export default router 