import Listcomponent from "../../components/order/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

    console.log("List Page.....");

    const { queryObj, setSearch, moveRead } = useQueryObj();
    console.log(useQueryObj());
  
    const movePage = (num) => {
      queryObj.page = num;
  
      // 클로져 개념
      setSearch({ ...queryObj });
    };
  
    const moveSearch = (type, keyword) => {
      // 검색 후 page = 1
      queryObj.page = 1;
      queryObj.type = type;
      queryObj.keyword = keyword;
  
      setSearch({ ...queryObj });
    };


    return ( 
        <div>
        <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
         주문 목록
        </div>
        {/* <ListSearchComponent queryObj={queryObj} moveSearch={moveSearch}></ListSearchComponent> */}
        <Listcomponent queryObj={queryObj} movePage={movePage} moveRead={moveRead} ></Listcomponent>
      </div>
     );
}
 
export default ListPage;