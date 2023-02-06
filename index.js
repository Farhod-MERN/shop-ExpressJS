import express from "express";
import { create } from "express-handlebars";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/products.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash"
import session from "express-session";
import varMiddleware from "./middleware/var.js";
import cookieParser from "cookie-parser";
import userMiddleware from "./middleware/user.js";
import hbsHelpers from "./utils/index.js"
dotenv.config();

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs", helpers: hbsHelpers });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser())
app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: false}))
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use(authRoute);
app.use(productRoute);

const startApp = () => {
  try {
    
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true, 
    }, () => {
      console.log("Mongo DB connected ");
    });

    const PORT = process.env.PORT || 4100;
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp()

