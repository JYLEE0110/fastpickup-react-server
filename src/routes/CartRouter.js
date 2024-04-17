import { Suspense, lazy } from "react";

const Cart_list = lazy(() => import("../pages/cart/ListPage"))

const CartRouter = ({Loading}) => {
    return ([
        {
            path : "list",
            element: <Suspense fallback = {Loading}><Cart_list/></Suspense>    
        }


    ]);
}

export default CartRouter;