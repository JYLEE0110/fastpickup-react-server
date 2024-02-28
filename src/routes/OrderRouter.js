import { Suspense, lazy } from "react"

const OrderRouter = ({Loading}) => {
    
    const Order_List = lazy(() => import("../pages/order/ListPage"))
    const Order_Read = lazy(() => import("../pages/order/ReadPage"))

    return ( 
        [
            {
                path : "list",
                element : <Suspense fallback = {Loading}><Order_List/></Suspense>
            },
            {
                path : "read/:ono",
                element : <Suspense fallback = {Loading}><Order_Read/></Suspense>
            }
        ] );
}
 
export default OrderRouter;