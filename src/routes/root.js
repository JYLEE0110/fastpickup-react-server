import { Suspense, lazy } from "react";
import LoadingPage from "../pages/LoadingPage";
import { MemoryRouter, createBrowserRouter } from "react-router-dom";
import MemberRouter from "./MemberRouter";

const Loading = <LoadingPage/>

//회원
const Member_index = lazy(() => import("../pages/members/IndexPage"))

const router = createBrowserRouter([


    {
        path: "member",
        element:<Suspense fallback = {Loading}><Member_index/></Suspense>,
        children: MemberRouter(Loading)
    }
])

export default router;