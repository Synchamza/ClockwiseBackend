import SlidingBannersModel from "../Models/SlidingBannersModel.js"

export const createBanner = async (req, res, next) => {
    try {
        const createBanner = await new SlidingBannersModel(
            {
                ...req.body
            }
        )

        const saveBanner = await createBanner.save()

        res.status(200).json({
            status: "success",
            message: 'created banner successfully',
            data: saveBanner
        })
    } catch (error) {
        // createError(error.status, error.message)
        next(error)
    }
}

export const updateBanner = async (req, res, next) => {
    try {
        const bannerId = req.params.bannerId
        // console.log(invoiceId)
        const updateBanner = await SlidingBannersModel.findByIdAndUpdate(bannerId, { $set: req.body }, { new: true })

        // console.log(updateInvoices)
        res.status(200).json({
            status: "success",
            message: 'update banner successfully',
            data: updateBanner
        })
    } catch (error) {
        next(error)
    }
}

export const deleteBanner = async (req, res, next) => {
    try {
        const bannerId = req.params.bannerId
        await SlidingBannersModel.findByIdAndDelete(bannerId)
        res.status(200).json({
            status: "success",
            message: 'Delete banner successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleBanner = async (req, res, next) => {
    try {
        const bannerId = req.params.bannerId
        const banner = await SlidingBannersModel.findById(bannerId)
        if(!banner){
            res.status(404).json({
                status: "Failed",
                message: 'Banner not found',
            })
        }
        res.status(200).json({
            status: "success",
            message: 'found banner successfully',
            data: banner
        })
    } catch (error) {
        next(error)
    }
}

export const getAllBanners = async (req, res, next) => {
    try {
        const banner = await SlidingBannersModel.find()
        res.status(200).json({
            status: "success",
            message: 'found banners successfully',
            data: banner
        })
    } catch (error) {
        next(error)
    }
}