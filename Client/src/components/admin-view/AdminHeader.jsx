import { logoutUser } from "@/store/auth-slice";
import { Button } from "../ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";

const AdminHeader = ({setOpen}) => {
    const dispatch=useDispatch()
    const handleLogout=()=>{
        dispatch(logoutUser())

    }

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-background border-b">
            <Button
            onClick={()=>setOpen(true)}

            
            className="lg:hidden sm:block">
                <GiHamburgerMenu />
                <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button onClick={handleLogout}
                className="inline-flex gap-2 items-center rounded-md 
                px-4 py-2 text-sm font-medium shadow">
                    <IoIosLogOut />
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default AdminHeader;
