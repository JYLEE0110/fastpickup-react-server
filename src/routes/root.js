import { Suspense, lazy } from "react";
import LoadingPage from "../pages/LoadingPage";
import {createBrowserRouter } from "react-router-dom";
import MemberRouter from "./MemberRouter";
import ProductRouter from "./ProductRouter";
import CartRouter from "./CartRouter";

const Loading = <LoadingPage/>

//회원
const Member_index = lazy(() => import("../pages/members/IndexPage"))

//상품
const Product_index = lazy(() => import("../pages/products/IndexPage"))

//장바구니
const Cart_index = lazy(() => import("../pages/cart/IndexPage"))

const router = createBrowserRouter([

    {
        path: "member",
        element:<Suspense fallback = {Loading}><Member_index/></Suspense>,
        children: MemberRouter(Loading)
    },
    {
        path : "product",
        element: <Suspense fallback = {Loading}><Product_index/></Suspense>,
        children: ProductRouter(Loading)
    },
    {
        path : "cart",
        element: <Suspense fallback = {Loading}><Cart_index/></Suspense>,
        children: CartRouter(Loading)
    }
])

export default router;