import axios from "axios"
import { createSearchParams } from "react-router-dom"


// 상품 목록
export const getProductList = async(queryObj) => {
    
    // 
    const queryString = createSearchParams(queryObj).toString()

    const res = await axios.get(`http://localhost:8080/api/product/list?${queryString}`)
    return res.data

}

// 상품 등록
export const registProduct = async(productInfo) => {

    const res = await axios.post(`http://localhost:8080/api/product/regist`, productInfo)
    return res.data

}

// 상품 상세 페이지
export const readProduct = async(pno) => {

    const res = await axios.get(`http://localhost:8080/api/product/read/${pno}`)
    return res.data

}