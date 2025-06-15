import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
        const { productsList} = useSelector((state) => state.shopProducts);


    const dispatch = useDispatch();

    const { toast } = useToast();

    const handleCartItemDelete = (getCartItem) => {
        dispatch(deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Cart item is deleted successfully",
                });
            }
        });
    };

    const handleUpdateQuantity = (getCartItem, typeOfAction) => {
        if (typeOfAction === "plus") {
            let getCartItems = cartItems.items || [];
            if (getCartItems.length) {
                const indexOfCurrentCartItem = getCartItems.findIndex((item) => item.productId === getCartItem?.productId);
                const getCurrentProductIndex=productsList.findIndex(product=>product._id ===getCartItem?.productId)

                const getTotalStock=productsList[getCurrentProductIndex].getTotalStock
                if (indexOfCurrentCartItem > -1) {
                    const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
                    if (getQuantity + 1 > getTotalStock) {
                        toast({
                            title: `Only ${getQuantity} quantity can be added for this item`,
                            variant: "destructive",
                        });
                        return;
                    }
                }
            }
        }
        dispatch(
            updateCartQuantity({
                userId: user?.id,
                productId: getCartItem?.productId,
                quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Cart item is updated successfully",
                });
            }
        });
    };

    return (
        <div className="flex items-center space-x-4">
            <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 rounded  object-cover" />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center mt-1 gap-3">
                    <Button
                        onClick={() => handleUpdateQuantity(cartItem, "minus")}
                        disabled={cartItem?.quantity === 1}
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 rounded-full"
                    >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>

                    <Button
                        onClick={() => handleUpdateQuantity(cartItem, "plus")}
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 rounded-full"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
                </p>
                <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
            </div>
        </div>
    );
};

export default UserCartItemsContent;
