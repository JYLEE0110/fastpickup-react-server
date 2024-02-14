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
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(postLoginThunk(loginInfo)).then(
        navigate(-1)
    )
  };

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
      <button
        onClick={handleLogin}
        className="w-full bg-[#dc4a51] text-white py-2 rounded-md hover:bg-red-500 focus:outline-none"
      >
        Login
      </button>
    </div>
  </div>
  );
};

export default LoginCOmponent;
