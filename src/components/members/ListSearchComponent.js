import { useEffect, useState } from "react";

const initState = {
  type: "",
  keyword: "",
  withDrawalStatus: ""
};

const ListSearchComponent = ({ queryObj, moveSearch }) => {
  const [searchObj, setSearchObj] = useState({ ...initState });

  useEffect(() => {
    searchObj.type = queryObj.type || "";
    searchObj.keyword = queryObj.keyword || "";
    searchObj.withDrawalStatus = queryObj.withDrawalStatus || ""
  }, [queryObj]);

  console.log(searchObj)

  return (
    <div className="float-right top-4 right-4 mr-10 mt-3">

    <select
        className="border p-2"
        value={searchObj.withDrawalStatus}
        onChange={(e) => setSearchObj({ ...searchObj, withDrawalStatus: e.target.value })}
      >
        <option value={""}>탈퇴 여부</option>
        <option value={"1"}>탈퇴</option>
        <option value={"0"}>비탈퇴</option>
      </select>

      <select
        className="border p-2"
        value={searchObj.type}
        onChange={(e) => setSearchObj({ ...searchObj, type: e.target.value })}
      >
        <option value={""}>검색</option>
        <option value={"i"}>아이디</option>
      </select>

      <input
        type="text"
        className="border p-2 rounded-md text-gray-900 focus:outline-none focus:border-indigo-600 placeholder:text-gray-400"
        value={searchObj.keyword}
        onChange={(e) =>
          setSearchObj({ ...searchObj, keyword: e.target.value })
        }
      />

      <button
        className="border p-2 bg-indigo-600 text-white rounded-md"
        onClick={() => moveSearch(searchObj.type, searchObj.keyword, searchObj.withDrawalStatus)}
      >
        검색
      </button>
    </div>
  );
};

export default ListSearchComponent;
