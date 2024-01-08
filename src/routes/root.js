import { Suspense, lazy } from "react";
import LoadingPage from "../pages/LoadingPage";
import {createBrowserRouter } from "react-router-dom";
import MemberRouter from "./MemberRouter";
import ProductRouter from "./ProductRouter";

const Loading = <LoadingPage/>

//회원
const Member_index = lazy(() => import("../pages/members/IndexPage"))

//상품
const Product_index = lazy(() => import("../pages/products/IndexPage"))

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
    }
])

export default router;