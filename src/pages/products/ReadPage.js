import { useNavigate, useParams } from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ReadPage = () => {

    const{queryObj,moveModify ,moveList} = useQueryObj();

    const {pno} = useParams();

    return(
        <div>
            <ReadComponent pno ={pno} queryObj={queryObj} moveModify = {moveModify} moveList={moveList}></ReadComponent>
        </div>
     );
}
 
export default ReadPage;