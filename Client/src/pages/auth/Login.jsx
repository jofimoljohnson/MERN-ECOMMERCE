import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/commoncomponents/CommonForm";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const {toast}=useToast()
    const navigate=useNavigate()

   

    const onSubmit=(e)=>{
            e.preventDefault()
            dispatch(loginUser(formData)).then((data)=>{
                if(data?.payload?.success){
                   
                    toast({
                        title: data?.payload?.message,
                     
                      })
                      navigate("/shop/home")

                    
                }else{
    
                    toast({
                        title: data?.payload?.message,
                        variant:"destructive"
    
                     
                      })
                }
            })
         }
    

    return (
        <div>
            <div className="mx-auto w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground"> Sign in to your account</h1>
                    <p className="mt-2">
                        Don't have an account
                        <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
                            Register
                        </Link>
                    </p>
                </div>
                <CommonForm
                    formControls={loginFormControls}
                    buttonText={"Sign In"}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
};

export default Login;
