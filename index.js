import express from "express";
import { create } from "express-handlebars";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/products.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs" });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

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

