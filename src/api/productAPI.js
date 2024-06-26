import axios from "axios"
import { createSearchParams } from "react-router-dom"
import jwtAxios from "../util/jwtUtil"


// 상품 목록
export const getProductList = async(queryObj) => {
    
    // 
    const queryString = createSearchParams(queryObj).toString()

    const res = await axios.get(`http://13.209.200.159/api/product/list?${queryString}`)
    return res.data

}

// 상품 등록
export const registProduct = async(productInfo) => {

    const res = await jwtAxios.post(`http://13.209.200.159/api/product/regist`, productInfo)
    return res.data

}

// 상품 상세 페이지
export const readProduct = async(pno) => {

    const res = await axios.get(`http://13.209.200.159/api/product/read/${pno}`)
    return res.data
}

// 상품 삭제
export const removeProduct = async(pno) => {

    const res = await jwtAxios.put(`http://13.209.200.159/api/product/remove/${pno}`)
    return res.data
}


// 상품 수정
export const modifyProduct = async(productInfo) => {

    const res = await jwtAxios.put(`http://13.209.200.159/api/product/modify`,productInfo)
    return res.data
}