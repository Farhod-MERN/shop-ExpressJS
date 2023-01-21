import  express  from "express";
import { create } from "express-handlebars"
import authRoute from "./routes/auth.js"
import productRoute from "./routes/products.js"
const app = express()

const hbs = create({defaultLayout:"main",extname: "hbs"})


app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "./views")

app.use(authRoute)
app.use(productRoute)



const PORT = process.env.PORT || 4100
app.listen(PORT, ()=>{console.log(`Server is running on port: ${PORT}`);})
