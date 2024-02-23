import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartList } from "../api/cartAPI";


export const getCartListThunk = createAsyncThunk('getCartListThunk', async(memberID) => {

    const response = await getCartList(memberID)
    
    return response 

})

const initState = {
    total : ""
}

const cartSlice = createSlice({
    name : 'cartSlice',
    initialState : initState,
    extraReducers : (builder) => {
        builder.addCase(getCartListThunk.fulfilled,(state, action) => {
            
            return action.payload
            
        })
        // .addCase(getCartListThunk.pending)
    }
})

export default cartSlice.reducer