import mongoose from 'mongoose';

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
    createdOn: { type: Date, default: Date.now }
});

const productModel = mongoose.model('products', productSchema);
export default  productModel