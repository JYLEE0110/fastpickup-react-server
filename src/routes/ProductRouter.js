import { Suspense, lazy } from "react";

const Product_List = lazy(() => import("../pages/products/ListPage"))
const Product_Regist = lazy(() => import("../pages/products/RegistPage"))
const Product_Modify = lazy(() => import("../pages/products/ModifyPage"))
const Product_Read = lazy(() => import("../pages/products/ReadPage"))

const ProductRouter = ({Loading}) => {
    return ( [

        {
            path : "list",
            element : <Suspense fallback = {Loading}><Product_List/></Suspense>
        },
        {
            path : "read/:pno",
            element : <Suspense fallback = {Loading}><Product_Read/></Suspense>
        },
        {
            path : "regist",
            element : <Suspense fallback = {Loading}><Product_Regist/></Suspense>
        },
        {
            path : "modify",
            element : <Suspense fallback = {Loading}><Product_Modify/></Suspense>
        },

    ] );
}
 
export default ProductRouter;