import mongoose from 'mongoose'
const ProductsSchema = new mongoose.Schema({
name: {
    type: String,
    trim: true,
    required: 'Product name is required'
},
description: {
    type: String,
    trim: true
},
price: {
	type: Number,
	default: 0,
},
quantity: {
	type: Number,
	default: 0,
    required: 'Number of quantity is required'
},
category: {
    type: String,
    trim: true
},
});
export default mongoose.model('Products', ProductsSchema);