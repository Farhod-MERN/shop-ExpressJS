import { Schema, model } from "mongoose"

const productSchema = new Schema({
    title : {type :String, required : true},
    description : {type: String, required : true},
    image: {type: String ,required : true},
    price : {type: String, required: true},
    username : {type: String, required: true},
    address : {type: String, required: true},
    phone : {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User"}
},{timestamps: true})

const Product = model("Products", productSchema)
export default Product
