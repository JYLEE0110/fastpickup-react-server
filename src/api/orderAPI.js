import axios from "axios"

// 주문
export const order = async(params) => {
    const res = await axios.post(`http://localhost:8080/api/order/create`,params)

    return res.data
}