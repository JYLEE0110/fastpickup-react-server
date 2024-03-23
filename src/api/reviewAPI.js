import axios from "axios"
import { createSearchParams } from "react-router-dom"
import jwtAxios from "../util/jwtUtil"

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

// 리뷰 상세
export const readReview = async(rno) => {

    const res = await axios.get(`http://localhost:8080/api/review/read/${rno}`)
    return res.data

}
// 리뷰 답글 상세
export const readReply = async(gno) => {

    const res = await axios.get(`http://localhost:8080/api/review/reply/read/${gno}`)
    return res.data

}

// 리뷰 수정
export const modifyReview = async(modifyInfo) => {

    const res = await axios.put(`http://localhost:8080/api/review/modify`,modifyInfo)
    return res.data

}

// 리뷰 삭제
export const removeReview = async(rno) => {

    const res = await axios.put(`http://localhost:8080/api/review/remove/${rno}`)
    return res.data

}
