import { useParams } from "react-router-dom";
import ReadComponent from "../../components/order/ReadComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ReadPage = () => {

    const{queryObj,moveList} = useQueryObj();

    const {ono} = useParams();

    return ( 
        <div>
            <ReadComponent ono={ono} queryObj={queryObj} moveList={moveList}></ReadComponent>
        </div>
     );
}
 
export default ReadPage;