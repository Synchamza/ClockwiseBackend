import express from "express"
import { zoomAuth, zoomCallback, zoomMeetCreate, zoomRefreshToken, } from "../Controllers/zoomMeetController.js"
const meetRoute = express.Router()

// http://{domain-name}/api/services/create
meetRoute.post('/create', zoomMeetCreate)
meetRoute.get('/auth/zoom', zoomAuth)
meetRoute.get('/callback', zoomCallback)
meetRoute.get('/refreshToken', zoomRefreshToken)


export default meetRoute