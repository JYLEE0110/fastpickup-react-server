import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postLogin } from "../api/memberAPI";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";


const initState = {
    username : "",
    roleNames : [],
    loading : false,
    errorMsg : null
}

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
        },

        requestLogout : (state) => {
            removeCookie('login')

            return initState
        }
    },
    extraReducers : (builder) => {
        builder.addCase(postLoginThunk.fulfilled, (state, action) => {

            const {username, errorMsg, roleNames, accessToken, refreshToken} = action.payload

            if(errorMsg){
                state.errorMsg = errorMsg
                return
            }

            setCookie("login", JSON.stringify(action.payload),1)

            console.log(action.payload)

            return {...action.payload, loading:false}

        })
        .addCase(postLoginThunk.pending, (state, aciton) => {
            console.log("pending")
            state.loading = true
        })

        .addCase(postLoginThunk.rejected, (state, action) => {
            console.log("rejected")
        })

    }
})

export const {requestLogout} = loginSlice.actions
export const {requestLogin} = loginSlice.actions


// Redux는 동기적으로 작동 =>
// ReduxThunk를 사용하여 비동기 작업처리를 도와주는 middleWare 도입
// dispatch로 비동기 작업 수행
export const postLoginThunk = createAsyncThunk('postLoginThunk', async (params, { rejectWithValue }) => {
    try {
      const response = await postLogin(params);
      // postLogin 함수가 에러 메시지를 반환하면 프로미스를 reject합니다.
      if (response.errorMsg) {
        return rejectWithValue(response.errorMsg);
      }
      // 로그인이 성공한 경우 응답 데이터를 반환합니다.
      return response;
    } catch (error) {
      // 다른 종류의 에러(예: 네트워크 문제)를 처리합니다.
      console.error("로그인 중 에러 발생:", error);
      throw error; // 에러를 재전파하여 catch 블록에서 캐치되도록 합니다.
    }
  });
export default loginSlice.reducer