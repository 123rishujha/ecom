const express = require("express");
const { CartModel } = require("../models/cart.model");

const cartRoute = express.Router();

cartRoute.get("/",async (req,res)=>{
    const userId = req.userId
    console.log("userId",userId);
   try{
       let cart = await CartModel.find({userId});
       res.json({
           success:true,
           result: cart
       })
   } 
   catch(err){
       res.status(400).json({
           success:false,
           error: err
       })
   }
});
cartRoute.post("/add",async (req,res)=>{
    const userId = req.userId
    const {productId,quantity,imageUrls,price,discount,title} = req.body;
    if(userId && productId && quantity){
        let newCart = new CartModel({
            userId,
            productId,
            quantity,
            imageUrls,
            price,
            discount,
            title
        })
        let savedCart = await newCart.save();
        console.log(savedCart)
        res.json({
            success: true,
            result: savedCart
        })
    }
    else{
        if(!userId){
            res.status(401).send({
            success: false,
            message: "You are not authenticated"
        })
        }
        else{
        res.status(401).send({
            success: false,
            message: "please provide productId, quantity, imageUrls, price and title"
        })    
        }
    }
})

module.exports = {cartRoute}
