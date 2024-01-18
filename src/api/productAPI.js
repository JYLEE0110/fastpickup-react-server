import axios from "axios"
import { createSearchParams } from "react-router-dom"


export const getProductList = async(queryObj) => {

    // 
    const queryString = createSearchParams(queryObj).toString()

    const res = await axios.get(`http://localhost:8080/api/product/list?${queryString}`)
    return res.data

}