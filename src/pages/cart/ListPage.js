import ListComponent from "../../components/cart/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

  const { queryObj, setSearch } = useQueryObj();

  console.log(useQueryObj());

  const movePage = (num) => {
    queryObj.page = num;

    // 클로져 개념
    setSearch({ ...queryObj });
  };

  return (
    <div>
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
        장바구니목록
      </div>
      <ListComponent queryObj={queryObj} movePage={movePage}></ListComponent>
    </div>
  );
};

export default ListPage;
