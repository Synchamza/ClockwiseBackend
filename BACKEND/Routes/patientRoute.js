import express from "express"
import {
    createPatients,
    updatePatients,
    RejectedPatients,
    deletePatients,
    SinglePatient,
    AllPatients,
    ApprovedPatients,
    searchPatients
} from '../Controllers/patientsController.js';
import { verifyPatientAdmin, verifyToken } from "../Utils/verifyToken.js";


const patientsRoute = express.Router()

// appointments route middlewares ====>
patientsRoute.post('/create',verifyToken, verifyPatientAdmin, createPatients)
patientsRoute.put('/update/:patientId',verifyToken, verifyPatientAdmin, updatePatients)
patientsRoute.get('/rejected',verifyToken, verifyPatientAdmin, RejectedPatients);
patientsRoute.get('/approved',verifyToken, verifyPatientAdmin, ApprovedPatients);
patientsRoute.delete('/delete/:patientId',verifyToken, verifyPatientAdmin, deletePatients)
patientsRoute.get('/getSingle/:patientId',verifyToken, SinglePatient)
patientsRoute.get('/find',verifyToken, AllPatients)
patientsRoute.get('/query',verifyToken, searchPatients)


export default patientsRoute