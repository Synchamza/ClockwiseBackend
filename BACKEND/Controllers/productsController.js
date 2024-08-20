import ProductsModel from "../Models/ProductsModel.js"

export const createProduct = async (req, res, next) => {
    try {
        const createProduct = await new ProductsModel(
            {
                ...req.body
            }
        )

        const saveProduct = await createProduct.save()

        res.status(200).json({
            status: "success",
            message: 'created product successfully',
            data: saveProduct
        })
    } catch (error) {
        // createError(error.status, error.message)
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId
        // console.log(invoiceId)
        const updateProduct = await ProductsModel.findByIdAndUpdate(productId, { $set: req.body }, { new: true })

        // console.log(updateInvoices)
        res.status(200).json({
            status: "success",
            message: 'update product successfully',
            data: updateProduct
        })
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId
        await ProductsModel.findByIdAndDelete(productId)
        res.status(200).json({
            status: "success",
            message: 'Delete product successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId
        const product = await ProductsModel.findById(productId)
        res.status(200).json({
            status: "success",
            message: 'found product successfully',
            data: product
        })
    } catch (error) {
        next(error)
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductsModel.find()
        res.status(200).json({
            status: "success",
            message: 'found products successfully',
            data: products
        })
    } catch (error) {
        next(error)
    }
}