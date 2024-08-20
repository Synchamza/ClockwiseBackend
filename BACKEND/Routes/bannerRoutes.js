import express from "express"
import { createBanner, deleteBanner, getAllBanners, getSingleBanner, updateBanner } from "../Controllers/bannerController.js"
import { verifySlidingBannerAdmin, verifyToken } from "../Utils/verifyToken.js"

const bannerRoute = express.Router()

// http://{domain-name}/api/banner/create
bannerRoute.post('/create', verifyToken, verifySlidingBannerAdmin, createBanner)

// http://{domain-name}/api/banner/:bannerId
bannerRoute.put('/:bannerId', verifyToken, verifySlidingBannerAdmin, updateBanner)

// http://{domain-name}/api/banner/:bannerId
bannerRoute.delete('/:bannerId', verifyToken, verifySlidingBannerAdmin, deleteBanner)

// http://{domain-name}/api/banner/:bannerId
bannerRoute.get('/:bannerId', verifyToken, getSingleBanner)

// http://{domain-name}/api/banner/
bannerRoute.get('/', verifyToken, getAllBanners)


export default bannerRoute