import { useState } from "react";
import { postLoginThunk } from "../../reducers/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initState = {
  username: "",
  password: "",
};
const LoginCOmponent = () => {
  const [loginInfo, setLoginInfo] = useState({ ...initState });
  const [loginError, setLoginError] = useState(null); // 상태 추가
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    setLoginError(null);
    dispatch(postLoginThunk(loginInfo))
      .then((response) => {
        if (response.payload) {
          // 로그인 성공
          navigate("/member/mypage");
        } else {
          // 로그인 실패
          setLoginError("로그인 실패: " + response.payload);
        }
      })
      .catch((error) => {
        console.error("비동기 작업 실패:", error);
        setLoginError("로그인 실패: 서버 오류가 발생했습니다. 나중에 다시 시도하세요.");
      });
  };
  const handleRegistMember = () => {
    navigate("/member/regist")
  }

  return (
    <div className="flex justify-center items-start pt-20">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={loginInfo.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />
      </div>
      {loginError && ( // 로그인 에러 메시지 표시
          <p className="text-red-500 mb-4">{loginError}</p>
        )}
      <button
        onClick={handleLogin}
        className="w-full bg-[#dc4a51] text-white py-2 rounded-md hover:bg-red-500 focus:outline-none mb-1"
      >
        로그인
      </button>

      <button
        onClick={handleRegistMember}
        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-500 focus:outline-none"
      >
        회원가입
      </button>

    </div>
  </div>
  );
};

export default LoginCOmponent;
