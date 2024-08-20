import ServicesModel from "../Models/ServicesModel.js"

export const createService = async (req, res, next) => {
    try {
        const createService = await new ServicesModel(
            {
                ...req.body
            }
        )

        const saveService = await createService.save()

        res.status(200).json({
            status: "success",
            message: 'created service successfully',
            data: saveService
        })
    } catch (error) {
        // createError(error.status, error.message)
        next(error)
    }
}

export const updateService = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId
        // console.log(invoiceId)
        const updateService = await ServicesModel.findByIdAndUpdate(serviceId, { $set: req.body }, { new: true })

        // console.log(updateInvoices)
        res.status(200).json({
            status: "success",
            message: 'update service successfully',
            data: updateService
        })
    } catch (error) {
        next(error)
    }
}

export const deleteService = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId
        await ServicesModel.findByIdAndDelete(serviceId)
        res.status(200).json({
            status: "success",
            message: 'Delete service successfully',
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleService = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId
        const service = await ServicesModel.findById(serviceId)
        if (!service) {
            res.status(404).json({
                status: "success",
                message: 'service not found',
            })
        }
        res.status(200).json({
            status: "success",
            message: 'found service successfully',
            data: service
        })
    } catch (error) {
        next(error)
    }
}

export const getAllServices = async (req, res, next) => {
    try {
        const services = await ServicesModel.find()
        res.status(200).json({
            status: "success",
            message: 'found services successfully',
            data: services
        })
    } catch (error) {
        next(error)
    }
}


export const searchService = async (req, res, next) => {
    const { title } = req.query;
    const queryObject = {};

    console.log(title)

    if (title) {
        queryObject.title = title;
        console.log(queryObject);
    }

    try {
        const searchResult = await ServicesModel.find({
            itle: { $regex: title, $options: "i" },
        }).limit(40); // Use queryObject instead of req.query

        // const searchRes = await Resident.find(queryObject); // Use queryObject instead of req.query
        console.log(searchResult);

        if (searchResult.length > 0) {
            // Check if searchRes contains any data
            res.status(200).json({
                message: "Services found",
                data: searchResult,
            });
        } else {
            res.status(404).json({
                // Change status code to 404 for "Not Found"
                message: "Services not found",
                status: "failed",
            });
        }
    } catch (error) {
        console.error("Error searching Services:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};