import { Link, useNavigate } from "react-router-dom";
import HeaderNav from "./nav/HeaderNav";
import { useSelector } from "react-redux";

const BasicLayout = ({ children }) => {
  const navigate = useNavigate();
  const { memberID } = useSelector((state) => state.login);

  return (
    <div>
      <div className="fixed w-full h-[70px] bg-[#ae2d33] shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 w-10 h-[70px] flex justify-center items-center"
        >
          <img
            src={require("../images/header_backbtn.png")}
            className="w-[30px]"
          />
        </button>
        {/* Logo */}
        <div className="container h-[70px]">
          <h1 className="h-[70px] text-center flex justify-center items-center">
            <Link to={"/"} className="inline-block">
              <img
                src={require("../images/logo.png")}
                className="h-[53px]"
                alt="Logo"
              />
            </Link>
          </h1>
          {memberID ? (
            <div className="absolute right-3 top-0 h-[70px] flex items-center">
              <Link
                // to={"/cart"}
                className="mr-2"
              >
                <img
                  src={require("../images/shopping-cart.png")}
                  className="h-[30px]"
                  alt="Cart"
                />
              </Link>
              <Link to={"/member/mypage"} className="mr-2">
                <img
                  src={require("../images/header_mypage.png")}
                  className="h-[30px]"
                  alt="MyPage"
                />
              </Link>
            </div>
          ) : (
            <Link
              to={"/member/login"}
              className="absolute right-0 top-0 w-10 h-[70px] flex justify-center items-center"
            >
              <img
                src={require("../images/header_login.png")}
                className="h-[30px]"
                alt="LOGIN Page"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="flex">
        <HeaderNav></HeaderNav>
        <div className="mt-[70px] w-full">{children}</div>
      </div>
    </div>
  );
};

export default BasicLayout;
