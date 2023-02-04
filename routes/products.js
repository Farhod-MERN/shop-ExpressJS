import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
import Product from "../models/Products.js";

const router = Router()

router.get('/', (req, res)=>{
    res.render("index",{
      title : "App | Shop",
    })
 })
 router.get("/products", (req, res)=>{
    res.render("products",{
      title: "App | Products",
      isProducts : true
    })
 })
 router.get("/add", authMiddleware, (req, res)=>{
   res.render("add", {
      title : "App | Add",
      isAdd : true,
      errorAddProducts:  req.flash("errorAddProducts")
   })
})
router.post("/add-products", userMiddleware ,async (req, res)=>{
   const {title, description,image, price, phone, username, address} = req.body
   
   if(!title || !description || !image || !price || !phone || !username || !address){
      req.flash("errorAddProducts", "All fields is required")
      res.redirect("/add")
      return
    }

   const products = await Product.create({...req.body, user: req.userId})
   console.log(products)
   
   res.redirect("/add")
})

export default router