import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
    const {user}=useSelector((state)=>state.auth)
    return (
        <>
            <DialogContent className="sm:max-w-[600px]">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Id</p>
                            <Label>{orderDetails?._id}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Date</p>
                            <Label>{orderDetails?.orderDate ? orderDetails.orderDate.split("T")[0] : "N/A"}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Status</p>
                            <Badge
                                className={`py-1 px-3 ${
                                       orderDetails?.orderStatus === "confirmed"
                                            ? "bg-green-500"
                                            : orderDetails?.orderStatus === "rejected"
                                            ? "bg-red-600"
                                            : "bg-black"                                }`}
                            >
                                <Label>{orderDetails?.orderStatus}</Label>
                            </Badge>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Price</p>
                            <Label>$4521</Label>
                        </div>
                         <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Payment Method</p>
                            <Label>{orderDetails?.paymentMethod}</Label>
                        </div>
                         <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Payment Status</p>
                            <Label>{orderDetails?.paymentStatus}</Label>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Order Details</div>
                            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                ? orderDetails?.cartItems.map((item) => (
                                      <ul className="grid gap-3" key={item.id}>
                                          <li className="flex items-center justify-between">
                                              <span>Title:{item?.title}</span>
                                              <span>Quantity:{item?.quantity}</span>

                                              <span>Price:${item?.price}</span>
                                          </li>
                                      </ul>
                                  ))
                                : null}
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <div className="font-medium">Shipping Info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                                <span>{user?.userName}</span>
                                <span>{orderDetails?.addressInfo?.address}</span>
                                <span>{orderDetails?.addressInfo?.city}</span>
                                <span>{orderDetails?.addressInfo?.pinCode}</span>
                                <span>{orderDetails?.addressInfo?.phone}</span>
                                <span>{orderDetails?.addressInfo?.notes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </>
    );
};

export default ShoppingOrderDetailsView;
