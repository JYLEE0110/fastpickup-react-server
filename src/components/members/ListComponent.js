import { useEffect, useState } from "react";
import { getMemberList } from "../../api/memberAPI";
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
}

const ListComponent = ({queryObj, moveRead, movePage}) => {

    const navigate = useNavigate()

    const [memberList, setMemberList] = useState({...initState})

    useEffect(() => {
        getMemberList(queryObj).then((data) => {
            setMemberList(data)
        })
    },[queryObj])

    console.log(memberList)
    console.log(queryObj)

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
          onClick={() => moveRead(memberID)}
        >
          <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${withDrawalStatus ? 'bg-red-500' : 'bg-blue-500'} mr-2`}></div>
            <div className="flex flex-col ml-2">
              <div className="text-[16px] font-medium mb-1">ID : {memberID}</div>
              <div className="text-[14px] text-gray-500 font-bold">Name : {memberName}</div>
              <div className="text-[14px] text-blue-500 font-bold">Join Date:  {joinDate.slice(0, 10)}</div>
              {withDrawalStatus && (
                <div className="text-[14px] text-red-500 font-semibold ">Withdrawal Date: {withDrawalDate.slice(0, 10)}</div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  <div className="float-right top-4 right-4">
    <button
      className="bg-[#dc4a51] text-white mr-5 px-4 py-2 rounded-md mt-5"
      onClick={() => navigate("../regist")}
    >
      회원 등록
    </button>
  </div>
  <div>
    <ListPageComponent movePage={movePage} {...memberList}></ListPageComponent>
  </div>
</div>
     );
}
 
export default ListComponent;