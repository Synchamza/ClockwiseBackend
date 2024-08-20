import express from "express"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../Controllers/productsController.js";
import { verifyPatientAdmin, verifyToken } from "../Utils/verifyToken.js";
const productsRoute = express.Router()

// http://{domain-name}/api/products/create
productsRoute.post('/create', verifyToken, verifyPatientAdmin, createProduct)

// http://{domain-name}/api/products/:productId
productsRoute.put('/:productId', verifyToken, verifyPatientAdmin, updateProduct)

// http://{domain-name}/api/products/:productId
productsRoute.delete('/:productId', verifyToken, verifyPatientAdmin, deleteProduct)

// http://{domain-name}/api/products/:productId
productsRoute.get('/:productId', verifyToken, getSingleProduct)

// http://{domain-name}/api/products/
productsRoute.get('/', verifyToken, getAllProducts)


export default productsRoute