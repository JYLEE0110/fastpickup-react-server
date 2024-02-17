import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { requestLogout } from "../../reducers/loginSlice";

const MyComponent = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
      dispatch(requestLogout())
      navigate("/member/login")
    }

    return ( 
<div>
      <ul className="mt-5 flex flex-wrap justify-around">
        <li className="w-[45%] h-28 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/qna/list"}
          >
            <img src={require("../../images/mypage_qna.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            문의 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/review/list"}
          >
          <img src={require("../../images/mypage_review.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            리뷰 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 mt-5 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/order/list"}
          >
          <img src={require("../../images/mypage_order.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            주문 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 mt-5 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/member/update"}
          >
          <img src={require("../../images/mypage_member.png")} className="mx-auto mt-5 mb-2 h-[32px]" />
            내 정보 관리
          </Link>
        </li>
      </ul>
      <div className="absolute left-1/2 bottom-5 -translate-x-1/2">
        <button
          className="text-[17px] underline"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
 
export default MyComponent;