import axios from "axios"

// upload File 
export const uploadFile = async(formData) => {
    
    //http header 타입 지정
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await axios.post(`http://localhost:8080/api/product/images/upload`,formData, header)

    return res.data

}
// remove File
export const removeFile = async(fileName) => {

    const res = await axios.delete(`http://localhost:8080/api/product/images/remove/${fileName}`)

    return res.data

}