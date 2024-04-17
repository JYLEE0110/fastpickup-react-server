import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { requestLogout } from "../../reducers/loginSlice";
import { withdrawalMember } from "../../api/memberAPI";
import { removeCookie } from "../../util/cookieUtil";

const MyComponent = () => {
  const { memberID } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(requestLogout());
    navigate("/member/login");
  };

  const handleWithDrawal = () => {
    // alert는 Promise를 반환하지 않으므로 콜백 함수를 사용하거나, Promise를 반환하는 함수를 만들어야 함
    if (window.confirm("회원 탈퇴를 진행하시겠습니까?")) {
      withdrawalMember(memberID)
        .then(() => {
          alert("회원탈퇴에 성공하셨습니다.");
        })
        .then(() => {
          dispatch(requestLogout());
          navigate("/member/login");
        })
        .catch((error) => {
          // 실패한 경우에 대한 처리
          console.error("회원 탈퇴 오류:", error);
        });
    }
  };

  return (
    <div>
      <ul className="mt-5 flex flex-wrap justify-around">
        <li className="w-[45%] h-28 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/qna/list"}
          >
            <img
              src={require("../../images/mypage_qna.png")}
              className="mx-auto mt-5 mb-2 h-[32px]"
            />
            문의 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={`/review/list`}
          >
            <img
              src={require("../../images/mypage_review.png")}
              className="mx-auto mt-5 mb-2 h-[32px]"
            />
            리뷰 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 mt-5 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/order/list"}
          >
            <img
              src={require("../../images/mypage_order.png")}
              className="mx-auto mt-5 mb-2 h-[32px]"
            />
            주문 목록
          </Link>
        </li>
        <li className="w-[45%] h-28 mt-5 rounded-2xl shadow-custom">
          <Link
            className="block h-20 text-center text-[18px] font-medium"
            to={"/member/update"}
          >
            <img
              src={require("../../images/mypage_member.png")}
              className="mx-auto mt-5 mb-2 h-[32px]"
            />
            내 정보 관리
          </Link>
        </li>
      </ul>
      <div className="absolute left-1/2 bottom-9 -translate-x-1/2">
        <button className="text-[17px] underline" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <div className="absolute left-1/2 bottom-1 -translate-x-1/2">
        <button
          className="text-[17px] font-bold text-red-500 underline"
          onClick={handleWithDrawal}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
