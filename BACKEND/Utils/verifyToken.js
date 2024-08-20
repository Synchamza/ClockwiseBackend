import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("hello", token)
    if (!token) {
        return next(createError(401, "You are not authenticated!!"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Invaild token!!"))
        }
        req.admin = user
        next();
    })
}

export const verifySuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.superAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}

export const verifyInvoiceAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.invoiceAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifyAppointmentAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.appointmentAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifyPatientAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.patientAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifyPhysicianAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.physicianAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifyProductAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.productAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifySlidingBannerAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.slidingBannerAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}

export const verifyServiceAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.serviceAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}

export const verifyTeamMemberAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.teamMemberAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifyFaqsAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.faqsAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifyTestimonialAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.testimonialAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


export const verifyContentPageAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.admin.admin.contentPageAdmin) {
            next()
        } else {
            return next(createError(403, "You are not authorized!!"))
        }
    })
}


