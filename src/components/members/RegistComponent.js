import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registMember } from "../../api/memberAPI";

const RegistComponent = () => {

    const initState = {
        memberID : "",
        memberPW : "",
        comfirmMemberPW : "",
        memberName : "",
        memberAddr : "",
        memberPhoneNum : "",
    }

    const [loginInfo, setLoginInfo] = useState({...initState})
    const [error, setError] = useState(null); // 상태 추가

    const navigate = useNavigate()

    const handleChange = (e) => {
        setLoginInfo((loginInfo) => ({
            ...loginInfo,
            [e.target.name]: e.target.value,
          }));
      };

      const handleRegistMember  = () => {
        registMember(loginInfo)
          .then(res => {
            navigate("/member/login")
          })
          .catch((error) => {
            if (error.response) {
              console.error('서버 응답 에러:', error.response.data);
              setError('서버 응답 에러: ' + error.response.data.message);
            } else if (error.request) {
              console.error('요청 에러:', error.request);
              setError('요청 에러: 서버에 요청을 보낼 수 없습니다.');
            } else {
              console.error('일반적인 에러:', error.message);
              setError('일반적인 에러: 서버 오류가 발생했습니다.');
            }
          });
      };
    return ( 
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">회원 가입</h2>
  

          {/* 회원 ID 입력란 */}
          <div className="mb-4">
            <label htmlFor="memberID" className="block text-gray-600 text-sm font-medium mb-2">
              ID
            </label>
            <input
              type="text"
              id="memberID"
              name="memberID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="ID를 입력하세요"
              onChange ={handleChange}
            />
          </div>
  
          {/* 회원 Password 입력란 */}
          <div className="mb-4">
            <label htmlFor="memberPW" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="memberPW"
              name="memberPW"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Password를 입력하세요"
              onChange ={handleChange}
            />
          </div>
  
          {/* Password 검증 입력란 */}
          <div className="mb-4">
            <label htmlFor="comfirmMemberPW" className="block text-gray-600 text-sm font-medium mb-2">
              Password 확인
            </label>
            <input
              type="password"
              id="comfirmMemberPW"
              name="comfirmMemberPW"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Password를 다시 입력하세요"
              onChange ={handleChange}
            />
          </div>
  
          {/* 이름 입력란 */}
          <div className="mb-4">
            <label htmlFor="memberName" className="block text-gray-600 text-sm font-medium mb-2">
              이름
            </label>
            <input
              type="text"
              id="memberName"
              name="memberName"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="이름을 입력하세요"
              onChange ={handleChange}
            />
          </div>
  
          {/* 주소 입력란 */}
          <div className="mb-4">
            <label htmlFor="memberAddr" className="block text-gray-600 text-sm font-medium mb-2">
              주소
            </label>
            <input
              type="text"
              id="memberAddr"
              name="memberAddr"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="주소를 입력하세요"
              onChange ={handleChange}
            />
          </div>
  
          {/* 핸드폰 번호 입력란 */}
          <div className="mb-6">
            <label htmlFor="memberPhoneNum" className="block text-gray-600 text-sm font-medium mb-2">
              핸드폰 번호
            </label>
            <input
              type="text"
              id="memberPhoneNum"
              name="memberPhoneNum"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="핸드폰 번호를 입력하세요"
              onChange ={handleChange}
            />
          </div>
          {error && ( 
          <p className="text-red-500 mb-4">{error}</p>
        )}
          {/* 회원가입 버튼 */}
          <button
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:hover:bg-blue-500 focus:outline-none"
            onClick = {handleRegistMember}
          >
            회원가입
          </button>
      </div>
    );
  };
 
export default RegistComponent;