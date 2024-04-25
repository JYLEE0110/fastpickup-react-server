import axios from "axios"
import jwtAxios from "../util/jwtUtil"

// product upload File 
export const uploadFile = async(formData) => {
    
    //http header 타입 지정
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await jwtAxios.post(`http://13.209.200.159/api/file/upload`,formData, header)

    return res.data

}
// product remove File
export const removeFile = async(fileName) => {

    const res = await jwtAxios.delete(`http://13.209.200.159/api/file/remove/${fileName}`)

    return res.data

}