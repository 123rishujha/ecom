const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: {type:String, required:true},
    productId: {type: String, required: true},
    quantity: {type:Number,default:1},
    imageUrls: {type: Array, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, required: true},
    title: {type: String, required: true}
})

const CartModel = mongoose.model("cart",cartSchema);

module.exports = {
    CartModel
}

