import axios from "axios"
import { createSearchParams } from "react-router-dom"
import jwtAxios from "../util/jwtUtil"

export const getMemberList = async(queryObj) => {
    
    // 
    const queryString = createSearchParams(queryObj).toString()

    // const res = await jwtAxios.get(`http://localhost:8080/api/member/list?${queryString}`)
    const res = await jwtAxios.get(`http://13.209.200.159/api/member/list?${queryString}`)
    return res.data

}

// 로그인
export const postLogin = async(params) => {

    const formData = new URLSearchParams()

    formData.append('username', params.username)
    formData.append('password', params.password)

    const res = await axios.post("http://13.209.200.159/api/member/login", formData, {
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
    })

    return res.data
}

// 회원 등록
export const registMember = async(loginInfo) => {

    const res = await axios.post(`http://13.209.200.159/api/member/regist`, loginInfo)

    return res.data

}

// 회원 탈퇴
export const withdrawalMember = async(memberID) => {

    const res = await jwtAxios.put(`http://13.209.200.159/api/member/remove/${memberID}`)

    return res.data

}

// 탈퇴회원 재활성화
export const reactiveMember = async(memberID) => {

    const res = await jwtAxios.put(`http://13.209.200.159/api/member/reactive/${memberID}`)

    return res.data

}