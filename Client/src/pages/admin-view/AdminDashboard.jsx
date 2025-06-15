import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const {featureImageList}=useSelector((state)=>state.commonFeature)
    const dispatch=useDispatch()

    const handleUploadFeatureImage=()=>{
      dispatch(addFeatureImages(uploadedImageUrl)).then(data=>{
       if(data?.payload?.success){
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedImageUrl("")
       }
      })

    }


    useEffect(() => {
      dispatch(getFeatureImages())
      
    }, [dispatch])
    
console.log("Feature images list",featureImageList)

    return (
        <>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isCustomStyling={true}
              //  isEditMode={currentEditId !==null}
            />
            <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
            <div className="flex flex-col gap-4 mt-5">
              {
                featureImageList && featureImageList.length >0 
                ?featureImageList.map((featureImageItem)=>(
                  <div className="relative" key={featureImageItem.id}>
                    <img
                        src={featureImageItem?.image}
                        className="w-full h-[300px] object-cover rounded-t-lg  "
                    />
                </div>
                )):null
              }
             
            </div>
        </>
    );
};

export default AdminDashboard;
