import Review from "../../models/Review.js";
import Order from "../../models/Orders.js";
import Product from "../../models/Product.js";

export const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } = req.body;
        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: "confirmed",
        });
        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase product to review it.",
            });
        }

        const checkExistingReview = await Review.findOne({ productId, userId });
        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: "You already received this product!",
            });
        }
        const newReview = new Review({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        });
        await newReview.save();
        const reviews = await Review.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/totalReviewsLength;
        await Product.findByIdAndUpdate(productId,{averageReview})
        res.status(201).json({
            success:false,
            data:newReview
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

export const getProductReview = async (req, res) => {
    try {
        const {productId}=req.params 
        const review=await Review.find({productId})
        res.status(200).json({
            success:false,
            data:review
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};
