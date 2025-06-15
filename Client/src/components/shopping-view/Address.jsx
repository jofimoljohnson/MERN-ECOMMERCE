import { useState, useEffect } from "react";
import CommonForm from "../commoncomponents/CommonForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pinCode: "",
    notes: "",
};

const Address = ({setCurrentSelectedAddress,selectedId}) => {
    const [formData, setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const [currentEditId, setCurrentEditId] = useState(null);
    const { toast } = useToast();

    const handleManageAddress = (event) => {
        event.preventDefault();
        if (addressList.length >= 3 && currentEditId === null) {
            setFormData(initialAddressFormData);
            toast({
                title: "You can add max 3 addresses",
                variant: "destructive",
            });
            return;
        }

        currentEditId !== null
            ? dispatch(
                  editAddress({
                      userId: user?.id,
                      addressId: currentEditId,
                      formData,
                  })
              ).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(fetchAllAddress(user?.id));
                      setCurrentEditId(null);
                      setFormData(initialAddressFormData);
                      toast({
                          title: "Address updated successfully",
                      });
                  }
              })
            : dispatch(
                  addNewAddress({
                      ...formData,
                      userId: user?.id,
                  })
              ).then((data) => {
                  if (data?.payload?.success) {
                      dispatch(fetchAllAddress(user?.id));
                      setFormData(initialAddressFormData);
                      toast({
                          title: "Address added successfully",
                      });
                  }
              });
    };

    const isFormValid = () => {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    };

    const handleDeleteAddress = (getCurrentAddress) => {
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id));
                toast({
                    title: "Address deleted successfully",
                });
            }
        });
    };

    const handleEditAddress = (getCurrentAddress) => {
        setCurrentEditId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pinCode: getCurrentAddress?.pinCode,
            notes: getCurrentAddress?.notes,
        });
    };

    useEffect(() => {
        dispatch(fetchAllAddress(user?.id));
    }, [dispatch]);

    return (
        <>
            <Card>
                <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
                    {addressList && addressList.length > 0
                        ? addressList.map((singleAddressItem) => (
                              <AddressCard
                              selectedId={selectedId}
                                  key={singleAddressItem.id}
                                  addressInfo={singleAddressItem}
                                  handleDeleteAddress={handleDeleteAddress}
                                  handleEditAddress={handleEditAddress}
                                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                              />
                          ))
                        : null}
                </div>
                <CardHeader>
                    <CardTitle>{currentEditId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <CommonForm
                        formControls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={currentEditId !== null ? "Edit" : "Add"}
                        onSubmit={handleManageAddress}
                        isBtnDisabled={!isFormValid()}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default Address;
