module.exports =  (req, res, next) =>{
    
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
}