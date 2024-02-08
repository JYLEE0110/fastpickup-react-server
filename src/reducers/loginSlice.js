import { createAsyncThunk } from "@reduxjs/toolkit";


const initState = {
    username : "",
    roleNames : [],
    loading : false,
    errorMsg : null
}

// Redux는 동기적으로 작동 =>
// ReduxThunk를 사용하여 비동기 작업처리를 도와주는 middleWare 도입
// dispatch로 비동기 작업 수행
export const postLoginThunk = createAsyncThunk("postLoginThunk",(params) => {
    return postLogin(params)
})

// 이미 로그인이 되어있다면 login이라는 명명된 쿠키를 가져오고 없으면 초기데이터
const loadCookie = () => {
    const loginObj = getCookie("login")

    if(!loginObj) {
        return initState
    }
    return loginObj
}

const loginSlice = createSlice({
    name : 'loginSlice',
    initialState : loadCookie(),
    reducers: {
        requestLogin : (state, action) => {
            const payload = action.payload

            setCookie("login", JSON.stringify(payload), 1)

            return payload
        }
    }
})