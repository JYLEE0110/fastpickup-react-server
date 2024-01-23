import axios from "axios"

export const getCategoryList = async() => {

    const res = await axios.get(`http://localhost:8080/api/category/list`)
    return res.data
}