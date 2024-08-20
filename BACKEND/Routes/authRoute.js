import express from 'express'
// import {verifyToken} from '../Utils/verifyToken.js'
import {
    register, 
    login,
    updateUser,
    deleteUser,
    getUser,
    sendEmailFunc
} from '../Controllers/authController.js'
const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/login', login)         
authRoute.put('/update/:userId', updateUser)         
authRoute.get('/getUser/:userId', getUser)
authRoute.delete('/delete/:userId', deleteUser)
authRoute.post('/sendEmail', sendEmailFunc)

export default authRoute