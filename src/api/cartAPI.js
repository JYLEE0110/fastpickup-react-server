import axios from "axios"
import { createSearchParams } from "react-router-dom"

// 장바구니 추가
export const addCart = async(params) => {
    const res = await axios.post(`http://localhost:8080/api/cart/add`,params)

    return res.data
}

// 장바구니 목록
export const getCartList = async(memberID, queryObj) => {

    const queryString = createSearchParams(queryObj).toString()

    const res = await axios.get(`http://localhost:8080/api/cart/list/${memberID}?${queryString}`)
    return res.data
}