import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../controller/error.controller.js'
 
const create = async (req, res) => {
const product = new Product(req.body)
try {
await product.save()
return res.status(200).json({
message: "Successfully created a new product!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err)
})
}
}
 
const list = async (req, res) => {
try {
 const query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' }; 
    }
    let products = await Product.find(query);
    res.json(products);
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err)
})
}
}
 
 
const productByID = async (req, res, next, id) => {
try {
let product = await Product.findById(id)
 
if (!product)
return res.status('400').json({
error: "Product not found"
})
 
req.result = product
next()
} catch (err) {
return res.status('400').json({
error: "Could not retrieve product"
})
}
}
 
 
const read = (req, res, next) => {
 
return res.json(req.result)
}
 
 
const update = async (req, res) => {
try {
let product = req.result
product = extend(product, req.body)
 
await product.save()
 
res.json(product)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err)
})
}
}
 
const remove = async (req, res) => {
try {
let product = req.result
let deletedProduct = await product.deleteOne()
 
res.json(deletedProduct)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err)
})
}
}

const removeAll = async (req, res) => {
  try {
    let result = await Product.deleteMany();
    res.json({ message: 'All products deleted successfully', result });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, productByID, read, list, remove, removeAll, update }
 