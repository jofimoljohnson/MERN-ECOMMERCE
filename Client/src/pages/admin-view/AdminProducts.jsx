import AdminProductTile from "@/components/admin-view/AdminProductTile";
import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import CommonForm from "@/components/commoncomponents/CommonForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin-slice/product-slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
};

const AdminProducts = () => {
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const { productList } = useSelector((state) => state.adminProducts);
    console.log("uploade img url", uploadedImageUrl);

    const { toast } = useToast();

    const dispatch = useDispatch();
    console.log("formData", formData);

    const onSubmit = (e) => {
        e.preventDefault();
        currentEditId !== null
            ? dispatch(
                  editProduct({
                      id: currentEditId,
                      formData: {
                          ...formData,
                          image: uploadedImageUrl,
                      },
                  })
              ).then((data) => {
                  console.log(data, "edit");
                  if (data?.payload?.success) {
                      dispatch(fetchAllProducts());
                      setFormData(initialFormData);
                      setOpenCreateProductDialog(false);
                      setCurrentEditId(null);
                      toast({
                          title: "Product Edited successfully",
                      });
                  }
              })
            : dispatch(
                  addNewProduct({
                      ...formData,
                      image: uploadedImageUrl,
                  })
              ).then((data) => {
                  console.log(data);
                  if (data?.payload?.success) {
                      setImageFile(null);
                      setFormData(initialFormData);
                      dispatch(fetchAllProducts());
                      setOpenCreateProductDialog(false);
                      toast({
                          title: "Product add successfully",
                      });
                  }
              });
    };

    const isFormValid = () => {
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((item) => item);
    };

    const handleDelete = (getCurrentProductId) => {
        console.log(getCurrentProductId);
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
            }
        });
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);
    console.log("productList", productList);

    return (
        <>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productList && productList.length > 0
                    ? productList.map((productItem) => (
                          <AdminProductTile
                              key={productItem.id}
                              setCurrentEditId={setCurrentEditId}
                              setOpenCreateProductDialog={setOpenCreateProductDialog}
                              setFormData={setFormData}
                              product={productItem}
                              handleDelete={handleDelete}
                          />
                      ))
                    : null}
            </div>
            <Sheet
                open={openCreateProductDialog}
                onOpenChange={() => {
                    setOpenCreateProductDialog(false);
                    setCurrentEditId(null);
                    setFormData(initialFormData);
                }}
            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>{currentEditId !== null ? "Edit Product" : "Add New Product"}</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditId !==null}
                    />
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditId !== null ? "Edit" : "Add"}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default AdminProducts;
