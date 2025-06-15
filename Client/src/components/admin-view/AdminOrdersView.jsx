import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useState, useEffect } from "react";
import AdminOrderDetailsView from "./AdminOrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin-slice/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();

    const handleFetchOrderDetails = (getId) => {
        dispatch(getOrderDetailsForAdmin(getId));
    };

    console.log("ORDER DETAILS", orderDetails);

    useEffect(() => {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order Id</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Order Price</TableHead>
                                <TableHead>
                                    <span className="sr-only">Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderList && orderList.length > 0
                                ? orderList.map((orderItem) => (
                                      <TableRow key={orderItem}>
                                          <TableCell>{orderItem?._id}</TableCell>

                                          <TableCell>
                                              {orderItem?.orderDate ? orderItem.orderDate.split("T")[0] : "N/A"}
                                          </TableCell>
                                          <Badge
                                              className={`py-1 px-3 ${
                                                  orderItem?.orderStatus === "confirmed"
                                                      ? "bg-green-500"
                                                      : orderItem?.orderStatus === "rejected"
                                                      ? "bg-red-600"
                                                      : "bg-black"
                                              }`}
                                          >
                                              <TableCell>{orderItem?.orderStatus}</TableCell>
                                          </Badge>

                                          <TableCell>${orderItem?.totalAmount}</TableCell>
                                          <TableCell>
                                              <Dialog
                                                  open={openDetailsDialog}
                                                  onOpenChange={() => {
                                                      setOpenDetailsDialog(false);
                                                      dispatch(resetOrderDetails());
                                                  }}
                                              >
                                                  <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                                                      View Details
                                                  </Button>
                                                  <AdminOrderDetailsView orderDetails={orderDetails} />
                                              </Dialog>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default AdminOrdersView;
