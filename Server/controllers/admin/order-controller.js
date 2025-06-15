import Order from "../../models/Orders.js"
import Address from "../../models/Address.js"

export const getAllOrdersOfAllUser=async(req,res)=>{
    try {
const orders=await Order.find({})
if(!orders.length){
    return res.status(404).json({
        success:false,
        message:"No orders found!"
    })
}
res.status(200).json({
    success:true,
    data:orders
})
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        }); 
    }
}


export const getOrderDetailsForAdmin=async(req,res)=>{
    try {
    const {id}=req.params 
    
    const order=await Order.findById(id)
        const address=await Address.findOne({userId:order.userId})
        

if(!order){
    return res.status(404).json({
        success:false,
        message:"Order  not found!"
    })
}
res.status(200).json({
    success:true,
data: {
        ...order.toObject(), 
        addressInfo: address,
      },})
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        }); 
    }
}

export const updateOrderStatus=async(req,res)=>{
    try {
        const {id}=req.params 
        const {orderStatus}=req.body 
        const order=await Order.findById(id)
if(!order){
    return res.status(404).json({
        success:false,
        message:"Order found!"
    })
}

await Order.findByIdAndUpdate(id,{orderStatus})
res.status(200).json({
    success:"Order status is updated successfully"
})


    } catch (error) {
         console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        }); 
    }
}