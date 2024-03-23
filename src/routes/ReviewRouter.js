import { Suspense, lazy } from "react";

const Review_List = lazy(() => import("../pages/review/ListPage"))
const Review_Regist = lazy(() => import("../pages/review/RegistPage"))
const Review_Modify = lazy(() => import("../pages/review/ModifyPage"))
const Review_Read = lazy(() => import("../pages/review/ReadPage"))

const ReviewRouter = ({Loading}) => {
    return ( [

        {
            path : "list",
            element : <Suspense fallback = {Loading}><Review_List/></Suspense>
        },
        {
            path : "read/:rno",
            element : <Suspense fallback = {Loading}><Review_Read/></Suspense>
        },
        {
            path : "regist/:pno",
            element : <Suspense fallback = {Loading}><Review_Regist/></Suspense>
        },
        {
            path : "modify/:rno/:pno",
            element : <Suspense fallback = {Loading}><Review_Modify/></Suspense>
        },

    ] );
}
 
export default ReviewRouter;