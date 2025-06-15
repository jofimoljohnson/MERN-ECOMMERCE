import express from "express";
import {
    handleImageUpload,
    addNewProduct,
    fetchAllProducts,
    deleteProduct,
    editProduct,
} from "../../controllers/admin/products-controller.js";
import { upload } from "../../helpers/cloudinary.js";
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addNewProduct);
router.get("/get", fetchAllProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
