import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../commoncomponents/CommonForm";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin-slice/order-slice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
    status: "",
};

const AdminOrderDetailsView = ({ orderDetails }) => {
    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const toast = useToast();

    const handleUpdateStatus = (event) => {
        event.preventDefault();
        const { status } = formData;

        dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then((data) => {
            if (data?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrdersForAdmin());
                setFormData(initialFormData);
                toast({
                    title: data?.payload?.message,
                });
            }
        });
    };

    return (
        <>
            <DialogContent className="sm:max-w-[600px]">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <div className="flex mt-6 items-center justify-between">
                            <p className="font-medium">Order Id</p>
                            <Label>{orderDetails?._id}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Date</p>
                            <Label>{orderDetails?.orderDate ? orderDetails.orderDate.split("T")[0] : "N/A"}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Price</p>
                            <Label>{orderDetails?.totalAmount}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Payment Method</p>
                            <Label>{orderDetails?.paymentMethod}</Label>
                        </div>

                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Status</p>
                            <Label>
                                <Badge
                                    className={`py-1 px-3 ${
                                        orderDetails?.orderStatus === "confirmed"
                                            ? "bg-green-500"
                                            : orderDetails?.orderStatus === "rejected"
                                            ? "bg-red-600"
                                            : "bg-black"
                                    }`}
                                >
                                    {orderDetails?.orderStatus}
                                </Badge>
                            </Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Price</p>
                            <Label>$4521</Label>
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
                            <div>
                                <CommonForm
                                    formControls={[
                                        {
                                            label: "Order Status",
                                            name: "status",
                                            componentType: "select",
                                            options: [
                                                { id: "pending", label: "Pending" },

                                                { id: "inProcess", label: "In Process" },
                                                { id: "inShipping", label: "In Shipping" },
                                                { id: "delivered", label: "Delivered" },

                                                { id: "rejected", label: "Rejected" },
                                            ],
                                        },
                                    ]}
                                    formData={formData}
                                    setFormData={setFormData}
                                    buttonText={"Update order Status"}
                                    onSubmit={handleUpdateStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </>
    );
};

export default AdminOrderDetailsView;
