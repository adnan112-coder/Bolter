//get Route
exports.getAllOrders = (req, res, next)=>{
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
}

//Post Route