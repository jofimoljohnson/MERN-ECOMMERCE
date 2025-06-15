import express from 'express'
import {addProductReview,getProductReview} from "../../controllers/shop/Review-controller.js"

const router=express.Router()
router.post("/add",addProductReview)
router.get("/:productId",getProductReview)

export default router