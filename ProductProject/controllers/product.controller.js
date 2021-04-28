const product = require('../models/product.model');


exports.getProducts = (req, res, next) => {
    product.find({}, { __v: false }).then(products => {
        res.status(200).json(products)
    }).catch(error => {
        //console.log(error);
        res.status(500).json(error)
    })
}

exports.getProduct = (req, res, next) => {
    product.find({ id: req.params.id }, { __v: false }).then(product => {
        res.status(200).json(product[0])
    }).catch(error => {

        res.status(500).json(error)
    })

}

exports.addProduct = (req, res, next) => {
    var pro = new product({ id: req.body.id, name: req.body.name, category: req.body.category, description: req.body.description, price: req.body.price });
    pro.save().then(pro => {
        res.status(200).json({ success: true })
    }).catch(error => {
        res.status(500).json({ msg: error["message"], success: false })
    })
}

exports.updateProduct = (req, res, next) => {
    var pro = new product({ _id: req.body._id, id: req.body.id, name: req.body.name, category: req.body.category, description: req.body.description, price: req.body.price });
    product.findOneAndUpdate({ _id: req.body._id }, { $set: pro }).then(pro => {
        res.status(200).json({ success: true })
    }).catch(error => {
        res.status(500).json({ msg: error["message"], success: false })
    })
}

exports.deleteProduct = (req, res, next) => {
    product.findOneAndRemove({ _id: req.body._id }).then(pro => {
        res.status(200).json({ success: true })
    }).catch(error => {
        res.status(500).json({ msg: error["message"], success: false })
    })
}
