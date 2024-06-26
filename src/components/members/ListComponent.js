import { useEffect, useState } from "react";
import { getMemberList, reactiveMember, withdrawalMember } from "../../api/memberAPI";
import { useNavigate } from "react-router-dom";
import ListPageComponent from "../common/ListPageComponent";

const initState = {
  list: [],
  endNum: 0,
  startNum: 0,
  nextBtn: false,
  prevBtn: false,
  pageNums: [],
  page: 0,
  size: 0,
  requestDTO: null,
};

const ListComponent = ({ queryObj, moveRead, movePage }) => {
  const navigate = useNavigate();

  const [memberList, setMemberList] = useState({ ...initState });

  useEffect(() => {
    getMemberList(queryObj).then((data) => {
      setMemberList(data);
    })
  }, [queryObj]);

  const handleNonReactiveBtn = (memberID) => {

    if (window.confirm("계정을 비활성화하시겠습니까?")) {
      withdrawalMember(memberID).then(() => {
        alert("해당 유저의 계정이 비활성화 되었습니다.");
        // After reactivation, you may want to refresh the member list
        getMemberList(queryObj).then((data) => {
          setMemberList(data);
        });
      });
    }
  }

  const handleReactiveBtn = (memberID) => {
    if (window.confirm("계정을 활성화하시겠습니까?")) {
      reactiveMember(memberID).then(() => {
        alert("해당 유저의 계정이 재활성화 되었습니다.");
        // After reactivation, you may want to refresh the member list
        getMemberList(queryObj).then((data) => {
          setMemberList(data);
        });
      });
    }
  }

  return (
    <div>
    <div className="container mx-auto my-5">
      <h1 className="text-2xl font-bold mb-3">Member List</h1>
      <ul className="mt-3 ml-6">
        {memberList.list.map(({ memberID, memberName, joinDate, withDrawalStatus, withDrawalDate }) => (
          <li
            key={memberID}
            className="pb-3 mb-3 border-b border-[#eee]"
            style={{ fontSize: "14px" }}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${withDrawalStatus ? 'bg-red-500' : 'bg-blue-500'} mr-2`}></div>
              <div className="flex flex-col ml-2">
                <div className={`text-[16px] font-medium mb-1}`}>ID : {memberID}</div>
                <div className={`text-[14px] ${withDrawalStatus ? 'text-gray-500 font-bold' : 'text-blue-500 font-bold'}`}>Name : {memberName}</div>
                <div className={`text-[14px] text-blue-500 font-bold }`}>Join Date:  {joinDate.slice(0, 10)}</div>
                {withDrawalStatus && (
                  <div className="text-[14px] text-red-500 font-semibold ">Withdrawal Date: {withDrawalDate.slice(0, 10)}</div>
                )}
              </div>



              {withDrawalStatus === false ? (
                  <button
                    className="bg-red-700 text-white mr-5 px-4 py-2 rounded-md mt-5 ml-auto"
                    style={{ textDecoration: 'none' }}
                    onClick={() => {handleNonReactiveBtn(memberID)}}
                  >
                    비활성화
                  </button>

              ):(              
                <button
                className="bg-blue-700 text-white mr-5 px-4 py-2 rounded-md mt-5 ml-auto"
                  style={{ textDecoration: 'none' }}
                  onClick={() => {handleReactiveBtn(memberID)}}
                >
                  활성화
                </button>
                )
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
    {/* <div className="float-right top-4 right-4">
      <button
        className="bg-green-600 text-white mr-5 px-4 py-2 rounded-md mt-5"
        onClick={() => navigate("../regist")}
      >
        회원 등록
      </button>
    </div> */}
    <div>
      <ListPageComponent movePage={movePage} {...memberList}></ListPageComponent>
    </div>
  </div>
  );
};

export default ListComponent;
