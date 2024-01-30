import { Suspense, lazy } from "react";

const Member_Login = lazy(() => import("../pages/members/LoginPage"))
const Member_List = lazy(() => import("../pages/members/ListPage"))
const Member_Regist = lazy(() => import("../pages/members/RegistPage"))
const Member_Read = lazy(() => import("../pages/members/ReadPage"))
const Member_Modify = lazy(() => import("../pages/members/ModifyPage"))


const MemberRouter = ({Loading}) => {
    return ([
        {
            path : "login",
            element: <Suspense fallback = {Loading}><Member_Login/></Suspense>    
        },

        {
            path : "list",
            element: <Suspense fallback = {Loading}><Member_List/></Suspense>    
        },

        {
            path : "regist",
            element: <Suspense fallback = {Loading}><Member_Regist/></Suspense>    
        },

        {
            path : "read",
            element: <Suspense fallback = {Loading}><Member_Read/></Suspense>    
        },

        {
            path : "modify",
            element: <Suspense fallback = {Loading}><Member_Modify/></Suspense>    
        },


    ]);
}
 
export default MemberRouter;