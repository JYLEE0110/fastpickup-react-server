import axios from "axios"
import { createSearchParams } from "react-router-dom"

export const getMemberList = async(queryObj) => {
    
    // 
    const queryString = createSearchParams(queryObj).toString()

    const res = await axios.get(`http://localhost:8080/api/member/list?${queryString}`)
    return res.data

}

// 로그인
export const postLogin = async(params) => {

    const formData = new URLSearchParams()

    formData.append('username', params.username)
    formData.append('password', params.password)

    const res = await axios.post("http://localhost:8080/api/member/login", formData, {
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
    })

    return res.data

}