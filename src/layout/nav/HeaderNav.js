import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const HeaderNav = () => {
  const { roleNames } = useSelector((state) => state.login);

  const isAdmin = roleNames.includes("ROLE_ADMIN");
  const isUser = roleNames.includes("ROLE_USER");

  // const {email} = useSelector(state => state.login)
  // //console.log("Email---------------------: " + email)
  // const navigate = useNavigate()
  // if(email !== undefined){
  // return (
  //   <div>
  //     <div className="container h-[70px]">
  //       <h1 className="h-[70px] text-center flex justify-center items-center">
  //         <Link to={"/"} className="inline-block">
  //           <img src={require("../../images/logo.png")} className="h-[53px]" />
  //         </Link>
  //       </h1>
  //       <Link to={"/member/mypage"} className="absolute right-0 top-0 w-10 h-[70px] flex justify-center items-center">
  //         <img src={require("../../images/header_mypage.png")} className="h-[30px]" />
  //       </Link>
  //     </div>
  //   </div>
  // )
  // }

  // return (
  //   <div>
  //     <div className="container h-[70px]">
  //       <h1 className="h-[70px] text-center flex justify-center items-center">
  //         <Link to={"/"} className="inline-block">
  //           <img src={require("../../images/logo.png")} className="h-[53px]" />
  //         </Link>
  //       </h1>
  //       <Link to={"/member/login"} className="absolute right-0 top-0 w-10 h-[70px] flex justify-center items-center">
  //         <img src={require("../../images/header_login.png")} className="h-[30px]" />
  //       </Link>
  //     </div>
  //   </div>
  // )

  return (
    <div className="bg-[#ae2d33] text-white h-screen  w-1/6 mt-[70px] ">
      {/* Sidebar Menu */}
      <div className="mt-8">
        <Link
          to={"/product/list"}
          className="block px-4 py-2 hover:bg-gray-700"
        >
          상품 목록
        </Link>

        {isAdmin && (
          <div>
            <Link
              to={"/product/regist"}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              상품 등록
            </Link>
            <Link
              to={"/member/list"}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              고객 목록
            </Link>
          </div>
        )}
        {(isAdmin || isUser) && (
          <div>
          <Link
            to={"/order/list"}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            주문 목록
          </Link>
          <Link
            to={"/review/list"}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            리뷰 목록
          </Link>
          <Link
            to={"/member/mypage"}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            마이 페이지
          </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderNav;
