import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import {
    AdminDashboard,
    AdminFeatures,
    AdminOrders,
    AdminProducts,
    Login,
    NotFound,
    PaymentSuccess,
    PaypalCancelPage,
    PaypalReturnPage,
    Register,
    SearchProducts,
    ShoppingAccount,
    ShoppingCheckout,
    ShoppingHome,
    ShoppingListing,
    UnauthPage,
} from "./pages";
import AdminLayout from "./components/admin-view/AdminLayout";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import CheckAuth from "./components/commoncomponents/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
    const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    if (isLoading) {
        return <Skeleton className="w-[600px] h-[600px] bg-black" />;
    }

    return (
        <div className="flex flex-col overflow-hidden bg-white">
            <Routes>
                <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>} />
                <Route
                    path="/auth"
                    element={
                        <CheckAuth>
                            <AuthLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <AdminLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="features" element={<AdminFeatures />} />
                </Route>

                <Route
                    path="/shop"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <ShoppingLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="home" element={<ShoppingHome />} />
                    <Route path="listing" element={<ShoppingListing />} />
                    <Route path="account" element={<ShoppingAccount />} />
                    <Route path="checkout" element={<ShoppingCheckout />} />
                    <Route path="paypal-return" element={<PaypalReturnPage />} />
                    <Route path="paypal-cancel" element={<PaypalCancelPage />} />
                    <Route path="payment-success" element={<PaymentSuccess />} />
                 <Route path="search" element={<SearchProducts/>} />

                </Route>
                <Route path="*" element={<NotFound />} />

                <Route path="/unauth-page" element={<UnauthPage />} />
            </Routes>
        </div>
    );
};

export default App;
