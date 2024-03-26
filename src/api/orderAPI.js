import axios from "axios"
import { createSearchParams } from "react-router-dom"
import jwtAxios from "../util/jwtUtil"

// 주문 생성
export const order = async(params) => {
    const res = await jwtAxios.post(`http://localhost:8080/api/order/create`,params)

    return res.data
}

// 주문 목록
export const getOrderList = async(queryObj, memberID) => {

    const queryString = createSearchParams(queryObj).toString()

    const res = await jwtAxios.get(`http://localhost:8080/api/order/list/${memberID}?${queryString}`)

    return res.data
}

// 주문 상세
export const readOrderInfo = async(ono) => {

    const res = await jwtAxios.get(`http://localhost:8080/api/order/read/${ono}`)

    return res.data
}

// 주문상태 변경
export const modifyOrderStatus = async(params) => {

    const res = await jwtAxios.post(`http://localhost:8080/api/order/modify/status`,params)

    return res.data
}