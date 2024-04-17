import axios from "axios"

export const getCategoryList = async() => {

    const res = await axios.get(`http://13.209.200.159/api/category/list`)
    return res.data
}