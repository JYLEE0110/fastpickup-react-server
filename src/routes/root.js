import { Suspense, lazy } from "react";
import LoadingPage from "../pages/LoadingPage";
import {createBrowserRouter } from "react-router-dom";
import MemberRouter from "./MemberRouter";
import ProductRouter from "./ProductRouter";
import CartRouter from "./CartRouter";
import OrderRouter from "./OrderRouter";
import ReviewRouter from "./ReviewRouter";

const Loading = <LoadingPage/>

//회원
const Member_index = lazy(() => import("../pages/members/IndexPage"))

//상품
const Product_index = lazy(() => import("../pages/products/IndexPage"))

//장바구니
const Cart_index = lazy(() => import("../pages/cart/IndexPage"))

//주문
const Order_index = lazy(() => import("../pages/order/IndexPage"))

//리뷰
const Review_index = lazy(() => import("../pages/review/IndexPage"))

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
    },{
        path : "order",
        element: <Suspense fallback = {Loading}><Order_index/></Suspense>,
        children: OrderRouter(Loading)
    },{
        path : "review",
        element: <Suspense fallback = {Loading}><Review_index/></Suspense>,
        children: ReviewRouter(Loading)
    }
])

export default router;