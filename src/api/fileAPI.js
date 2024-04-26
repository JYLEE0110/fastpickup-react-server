import axios from "axios"
import jwtAxios from "../util/jwtUtil"

// upload File 
export const uploadFile = async(formData) => {
    
    //http header 타입 지정
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await jwtAxios.post(`http://13.209.200.159/api/file/upload`,formData, header)

    return res.data

}
// remove File
export const removeFile = async(fileName) => {

    const res = await jwtAxios.delete(`http://13.209.200.159/api/file/remove/${fileName}`)

    return res.data

}

// remove All File
export const removeAllFile = async (fileNames) => {
    const res = await jwtAxios.delete(`http://13.209.200.159/api/file/remove/all`, {
        data: { imgsName: fileNames }
    });
    return res.data;
}