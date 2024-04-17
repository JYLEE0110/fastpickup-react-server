import { useEffect, useState } from "react";

const initState = {
  type: "",
  keyword: "",
};

const ListSearchComponent = ({ queryObj, moveSearch }) => {
  const [searchObj, setSearchObj] = useState({ ...initState });

  useEffect(() => {
    searchObj.type = queryObj.type || "";
    searchObj.keyword = queryObj.keyword || "";
  }, [queryObj]);

  console.log(searchObj)

  return (
    <div className="float-right top-4 right-4 mr-10 mt-3">
      <select
        className="border p-2"
        value={searchObj.type}
        onChange={(e) => setSearchObj({ ...searchObj, type: e.target.value })}
      >
        <option value={""}>---</option>
        <option value={"p"}>상품명</option>
        <option value={"c"}>카테고리</option>
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
        onClick={() => moveSearch(searchObj.type, searchObj.keyword)}
      >
        검색
      </button>
    </div>
  );
};

export default ListSearchComponent;
