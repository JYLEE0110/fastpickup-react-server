import axios from "axios"
import { createSearchParams } from "react-router-dom"

// 주문 생성
export const order = async(params) => {
    const res = await axios.post(`http://localhost:8080/api/order/create`,params)

    return res.data
}

// 주문 목록
export const getOrderList = async(queryObj) => {

    const queryString = createSearchParams(queryObj).toString()

    const res = await axios.get(`http://localhost:8080/api/order/list?${queryString}`)

    return res.data
}

// 주문 상세
export const readOrderInfo = async(ono) => {

    const res = await axios.get(`http://localhost:8080/api/order/read/${ono}`)

    return res.data
}