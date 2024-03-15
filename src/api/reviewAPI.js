import axios from "axios"
import { createSearchParams } from "react-router-dom"

// 상품상세페이지 리뷰 목록
export const getProductReviewList = async(rno,page) => {
    
    const res = await axios.get(`http://localhost:8080/api/review/list/product/${rno}?page=${page}&size=${5}`)
    return res.data

}