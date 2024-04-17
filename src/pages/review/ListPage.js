import { useParams } from "react-router-dom";
import ListComponent from "../../components/review/ListComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ListPage = () => {

    const { queryObj, setSearch, moveRead } = useQueryObj();

    console.log(useQueryObj());

    const movePage = (num) => {
      queryObj.page = num;
  
      // 클로져 개념
      setSearch({ ...queryObj });
    };

    return ( 
        <div>
            <ListComponent queryObj={queryObj} movePage={movePage} moveRead={moveRead}></ListComponent>
        </div>
     );
}
 
export default ListPage;