import { useNavigate, useParams } from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";
import useQueryObj from "../../hooks/useQueryObj";
import ReviewComponent from "../../components/products/ReviewComponent";

const ReadPage = () => {

    const{queryObj, moveModify ,moveList} = useQueryObj();

    const {pno} = useParams();

    return(
        <div>
            <ReadComponent pno ={pno} queryObj={queryObj} moveModify = {moveModify} moveList={moveList}></ReadComponent>
            <ReviewComponent pno = {pno}></ReviewComponent>
        </div>
     );
}
 
export default ReadPage;