import axios from "axios"
import { createSearchParams } from "react-router-dom"

// 상품상세페이지 리뷰 목록
export const getProductReviewList = async(pno,page) => {
    
    const res = await axios.get(`http://localhost:8080/api/review/list/product/${pno}?page=${page}&size=${6}`)
    return res.data

}
// 마이페이지 리뷰 목록
export const getMyPageReviewList = async(queryObj, memberID) => {

    const queryString = createSearchParams(queryObj).toString()
    const res = await axios.get(`http://localhost:8080/api/review/list/mypage/${memberID}?${queryString}`)
    return res.data

}
// 리뷰 작성
export const registReview = async(reviewInfo) => {

    const res = await axios.post(`http://localhost:8080/api/review/regist`,reviewInfo)
    return res.data

}
