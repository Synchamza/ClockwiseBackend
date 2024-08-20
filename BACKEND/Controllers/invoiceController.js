import InvoicesModel from "../Models/InvoicesModel.js"
import { createError } from "../Utils/error.js"


// createInvoice api ===>
export const createInvoice = async (req, res, next) => {
    try {
        const createInvoices = await new InvoicesModel(
            {
                ...req.body
            }
        )

        const saveInvoices = await createInvoices.save()

        res.status(200).json({
            status: "success",
            message: 'created invoices successfully',
            data: saveInvoices
        })
    } catch (error) {
        // createError(error.status, error.message)
        next(error)
    }
}



// updateInvoice api ===>
export const updateInvoice = async (req, res, next) => {
    try {
        const invoiceId = req.params.invoiceId
        // console.log(invoiceId)
        const updateInvoices = await InvoicesModel.findByIdAndUpdate(invoiceId, { $set: req.body }, { new: true })

        // console.log(updateInvoices)
        res.status(200).json({
            status: "success",
            message: 'update invoice successfully',
            data: updateInvoices
        })
    } catch (error) {
        next(error)
    }
}



// getPendingInvoices api ===>
export const getPendingInvoices = async (req, res, next) => {
    try {
        const pendingInvoices = await InvoicesModel.find({ status: 'pending' });

        res.status(200).json({
            status: "success",
            message: "Fetched pending invoices successfully",
            data: pendingInvoices
        });
    } catch (error) {
        next(createError(error.status || 500, error.message || "Server Error"));
    }
};




// getCompletedInvoices api ===>
export const getCompletedInvoices = async (req, res, next) => {
    try {
        const completedInvoices = await InvoicesModel.find({ status: 'completed' });

        res.status(200).json({
            status: "success",
            message: "Fetched completed invoices successfully",
            data: completedInvoices
        });
    } catch (error) {
        next(createError(error.status || 500, error.message || "Server Error"));
    }
};



// deleteInvoice api ===>
export const deleteInvoice = async (req, res, next) => {
    try {
        const invoiceId = req.params.invoiceId
        const invoice = await InvoicesModel.findById(invoiceId)
        if(!invoice) {
            res.status(404).json({
                status: "failed",
                message: 'invoice not found',
            })
        }
        await InvoicesModel.findByIdAndDelete(invoiceId)
        
        res.status(200).json({
            status: "success",
            message: 'Delete invoice successfully',
        })
    } catch (error) {
        next(error)
    }
}




// getInvoice api ===>
export const getInvoice = async (req, res, next) => {
    try {
        const invoiceId = req.params.invoiceId
        const invoice = await InvoicesModel.findById(invoiceId)
        res.status(200).json({
            status: "success",
            message: 'found invoice successfully',
            data: invoice
        })
    } catch (error) {
        next(error)
    }
}




// getAllInvoice api ===>
export const getAllInvoice = async (req, res, next) => {
    try {
        const allInvoice = await InvoicesModel.find()
        res.status(200).json({
            status: "success",
            message: 'found all invoice successfully',
            data: allInvoice
        })
    } catch (error) {
        next(error)
    }
}


