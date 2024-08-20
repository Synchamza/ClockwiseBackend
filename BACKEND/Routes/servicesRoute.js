import express from "express"
import { createService, deleteService, getAllServices, getSingleService, searchService, updateService } from "../Controllers/serviceController.js"
import { verifyServiceAdmin, verifyToken } from "../Utils/verifyToken.js"
const servicesRoute = express.Router()

// http://{domain-name}/api/services/create
servicesRoute.post('/create', verifyToken, verifyServiceAdmin, createService)

// http://{domain-name}/api/services/:serviceId
servicesRoute.put('/:serviceId', verifyToken, verifyServiceAdmin, updateService)

// http://{domain-name}/api/services/:serviceId
servicesRoute.delete('/:serviceId', verifyToken, verifyServiceAdmin, deleteService)

// http://{domain-name}/api/services/:serviceId
servicesRoute.get('/:serviceId', verifyToken, getSingleService)

// http://{domain-name}/api/services/
servicesRoute.get('/', verifyToken, getAllServices)

// http://{domain-name}/api/services/
servicesRoute.get('/find/query', verifyToken, searchService)


export default servicesRoute