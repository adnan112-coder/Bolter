const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Product = require("../models/product")

router.get("/", (req, res, next) =>{
    Product.find()
    .select("name price _id")
    .exec()
    .then(docs =>{
        console.log(docs)
        res.status(200).json(docs)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error: err})
    })
    // res.status(200).json({
    //     message: "Handling GET requests to /products"
    // })
})

router.post("/", (req, res, next) =>{
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then(result =>{
        console.log(result)
        res.status(201).json({
        message: "Created product",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(
            {error: err
            })
    })

    
    })
})

router.get("/:productId", (req, res, next) =>{
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc)
        if(doc){
            res.status(200).json({
                name: doc.name,

            })
        }else{
            res.status(404).json({message: "Invalid Id"})
        }
        
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.patch("/:productId", (req, res, next) =>{
    res.status(200).json({
        message: "Updated the product"
    })
})

router.delete("/:productId", (req, res, next) =>{
    //add mongoose remove method 
    res.status(200).json({
        message: "Deleted Product"
    })
})



module.exports = router