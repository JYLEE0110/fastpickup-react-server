import axios from "axios"
import { createSearchParams } from "react-router-dom"

export const getMemberList = async(queryObj) => {
    
    // 
    const queryString = createSearchParams(queryObj).toString()

    const res = await axios.get(`http://localhost:8080/api/member/list?${queryString}`)
    return res.data

}