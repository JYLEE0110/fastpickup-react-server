import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";

const jwtAxios = axios.create()

const beforeReq = (config) => {

    console.log("beforeRequest..............")

    const { accessToken } = getCookie("login")

    if(!accessToken){
       throw new Error("No ACCESS TOKEN")
    }

    // API 요청 헤더에 Bearer를 붙여서 보낸다.
    config.headers.Authorization = `Bearer ${accessToken}`

    return config

}
const requestFail = (err) => {

    console.log("request fail...............")

    return Promise.reject(err)
}

// response 전
const beforeRes = async (res) => {

    console.log("2xx Response..............")

    // accessTokrn 기간 만료 / 문제있을 시
    if(res.data.error === 'Expired'){

        console.log("AccessToken has expired")
        
        // 새로운 AccessToken값 받아옴
        const newAccessToken = await refreshJWT()

        // res.config => 원래 요청한 경로
        const originalRequest = res.config

        // 리프레쉬 토큰은 Barer 7자리 검사를 안한다.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return await axios(originalRequest)

    }

    return res;
}
//////////////////////////////////////////////
const refreshJWT = async () => {

    // email, pw 등 이미 쿠키에 저장되어있는 정보들을 전부 가져온다.
    const cookieValue = getCookie("login")

    // 그중에 accessToken, refreshToken 값만 추출
    const {accessToken, refreshToken} = cookieValue

    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }

    const res = await axios.get(`http://localhost:8080/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log(res.data)

    // 응답 데이터로 받은 Token 값(구)들을 
    // 쿠키에서 추출한 정보들(email, pw 등) 중 토큰 값들만 갱신
    cookieValue.accessToken = res.data.accessToken
    cookieValue.refreshToken = res.data.refreshToken

    setCookie("login",JSON.stringify(cookieValue), 1)

    return cookieValue.accessToken

}
//////////////////////////////////////////////////////


const responseFail = (err) => {

    console.log("response fail...........")



    return Promise.reject(err)
}

// 요청할때 2가지 작업
jwtAxios.interceptors.request.use(beforeReq, requestFail)
// 응답받을때 2가지 작업
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios