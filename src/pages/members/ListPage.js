import ListComponent from "../../components/members/ListComponent";
import ListSearchComponent from "../../components/members/ListSearchComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {
  const { queryObj, setSearch, moveRead } = useQueryObj();

  console.log(useQueryObj());

  const movePage = (num) => {
    queryObj.page = num;

    // 클로져 개념
    setSearch({ ...queryObj });
  };

  const moveSearch = (type, keyword, withDrawalStatus) => {
    // 검색 후 page = 1
    queryObj.page = 1;
    queryObj.type = type;
    queryObj.keyword = keyword;
    queryObj.withDrawalStatus = withDrawalStatus

    setSearch({ ...queryObj });
  };

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
       회원목록
      </div>
      <ListSearchComponent queryObj={queryObj} moveSearch={moveSearch}></ListSearchComponent>
      <ListComponent queryObj={queryObj} movePage={movePage} moveRead={moveRead}></ListComponent>
    </div>
  );
};

export default ListPage;
