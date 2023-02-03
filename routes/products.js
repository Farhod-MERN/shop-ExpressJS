import { Router } from "express";

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
 router.get("/add", (req, res)=>{
   if(!req.cookies.token){
      res.redirect("/")
      return
   }

   res.render("add", {
      title : "App | Add",
      isAdd : true
   })
})

export default router