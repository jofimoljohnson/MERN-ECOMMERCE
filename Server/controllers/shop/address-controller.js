import Address from "../../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pinCode, phone, notes } = req.body;
        if (!userId || !address || !city || !pinCode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided",
            });
        }

        const newlyCreateAddress = new Address({
            userId,
            address,
            city,
            pinCode,
            phone,
            notes,
        });

        await newlyCreateAddress.save();
        res.status(201).json({
            success: true,
            data: newlyCreateAddress,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

export const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is required",
            });
        }

        const addressList = await Address.find({ userId });
        res.status(200).json({
            success: true,
            data: addressList,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

export const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User  and Address Id is required",
            });
        }

        const address = await Address.findByIdAndUpdate(
            {
                _id: addressId,
                userId,
            },
            formData,
            { new: true }
        );
        if(!address){
            return res.status(404).json({
                success:false,
                message:"Address not found"
            })
        }
        res.status(200).json({
            success:true,
            data:address
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};


export const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User  and Address Id is required",
            });
        }

        const address=await Address.findOneAndDelete({_id:addressId,userId})
        if(!address){
            return res.status(404).json({
                success:false,
                message:"Address not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Address deleted successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
