import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name:'dyb5dferg',
    api_key:'189331838555833',
    api_secret:'3t8ay8yVMcFAIv0Ef731aA1ckbc'
})

const storage=new multer.memoryStorage()
async function imageUploadUtil(file){
    const result=await cloudinary.uploader.upload(file,{
        resource_type:'auto',

    })
    return result
}

const upload=multer({
    storage
})
export { upload,imageUploadUtil };
