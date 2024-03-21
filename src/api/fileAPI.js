import axios from "axios"

// product upload File 
export const productUploadFile = async(formData) => {
    
    //http header 타입 지정
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await axios.post(`http://localhost:8080/api/product/images/upload`,formData, header)

    return res.data

}
// product remove File
export const productRemoveFile = async(fileName) => {

    const res = await axios.delete(`http://localhost:8080/api/product/images/remove/${fileName}`)

    return res.data

}

// review upload File 
export const reviewUploadFile = async(formData) => {
    
    //http header 타입 지정
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await axios.post(`http://localhost:8080/api/review/images/upload`,formData, header)

    return res.data

}
// review remove File
export const reviewRemoveFile = async(fileName) => {

    const res = await axios.delete(`http://localhost:8080/api/review/images/remove/${fileName}`)

    return res.data

}