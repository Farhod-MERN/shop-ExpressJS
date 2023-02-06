import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
import Product from "../models/Products.js";

const router = Router()

router.get('/', async (req, res)=>{
   const products = await Product.find().populate("user").lean()

    res.render("index",{
      title : "App | Shop",
      products : products.reverse(),
      userId: req.userId ? req.userId.toString() : null,
      isHome: true,
    })
 })
 router.get("/products", async (req, res)=>{
   const userCheck = req.userId ? req.userId.toString() : null
   const myProducts = await Product.find({user : userCheck}).populate("user").lean()
   // console.log(myProducts)
   res.render("products",{
      title: "App | Products",
      isProducts : true,
      myProducts : myProducts.reverse()
    })
 })
 router.get("/product/:id",async (req, res)=>{
   //req.params  - linkdagi unique narsa req.paramsga tushadi
   const id = req.params.id
   const product = await Product.findById(id).populate("user").lean()
   // console.log(product)
   res.render("productDetail", {
      product: product
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
   // console.log(products)
   
   res.redirect("/add")
})

router.get("/edit-product/:id",  async (req, res)=>{
   const id = req.params.id   
   const product = await Product.findById(id).populate("user").lean()

   res.render("edit-product", {
      product : product,
      errorEditProducts: req.flash("errorEditProducts")
   })
})

router.post("/edit-product/:id", async (req, res)=>{
   const {title, description,image, price, phone, username, address} = req.body
   const id = req.params.id

   if(!title || !description || !image || !price || !phone || !username || !address){
      req.flash("errorEditProducts", "All fields is required")
      res.redirect(`/edit-product/${id}`)
      return
    }
   
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true})


   res.redirect("/products")
})
export default router