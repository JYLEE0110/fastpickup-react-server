import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../reducers/loginSlice";
import cartSlice from "../reducers/cartSlice";

export default configureStore({
    reducer : {
        login : loginSlice,
        cart : cartSlice
    }
})