import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartList } from "../api/cartAPI";
import { getCookie, setCookie } from "../util/cookieUtil";


export const getCartListThunk = createAsyncThunk('getCartListThunk', async(memberID) => {

    const response = await getCartList(memberID)
    
    return response 

})

const initState = {
    total : ""
}

const loadCookie = () => {
    const cartObj = getCookie("cart")

    if(!cartObj) {
        return initState
    }
    return cartObj
}

const cartSlice = createSlice({
    name : 'cartSlice',
    initialState : loadCookie(),
    extraReducers : (builder) => {
        builder.addCase(getCartListThunk.fulfilled,(state, action) => {
            
            setCookie("cart", JSON.stringify(action.payload), 1)

            return action.payload
            
        })
        // .addCase(getCartListThunk.pending)
    }
})

export default cartSlice.reducer