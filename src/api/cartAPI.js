import axios from "axios"

// 장바구니 추가
export const addCart = async(params) => {
    const res = await axios.post(`http://localhost:8080/api/cart/add`,params)

    return res.data
}

// 장바구니 목록
export const getCartList = async(memberID) => {

    const res = await axios.get(`http://localhost:8080/api/cart/list/${memberID}`)
    return res.data
}