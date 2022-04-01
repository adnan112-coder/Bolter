const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Order = require("../models/order")
const Product = require("../models/product")
const checkAuth = require("../middleware/auth")

router.get("/", checkAuth, (req, res, next)=>{
    Order.find()
    .select("-v")
    .exec()
    .then(docs =>{
        res.status(200).json({
            count : docs.length,
            orders: docs.map(doc =>{
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity
                }
            })
            
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post("/", (req, res, next)=>{
    Product.findById(req.body.productId)
    .then()
    .catch(err =>{
        res.status(500).json({
            message: "Product not found",
            error : err
        })
    })
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
    .then(result =>{
        console.log(result)
        res.status(201).json({
            message: "Order Saved"
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    res.status(201).json({
        message: "Order created",
        order: order
    })
})

router.get("/:orderId", (req, res, next)=>{
    res.status(200).json({
        message: "Orders detail",
        orderId: req.params.orderId
    })
})

router.delete("/:orderId", (req, res, next)=>{
    res.status(200).json({
        message: "Orders deleted",
        orderId: req.params.orderId
    })
})



module.exports = router