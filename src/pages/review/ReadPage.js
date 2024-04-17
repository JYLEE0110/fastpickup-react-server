import { useParams } from "react-router-dom";
import useQueryObj from "../../hooks/useQueryObj";
import ReadComponent from "../../components/review/ReadComponent";

const ReadPage = () => {

    const{queryObj, moveReviewModify ,moveList} = useQueryObj();

    const {rno} = useParams();

    return (
        <div>
            <ReadComponent rno ={rno} queryObj={queryObj} moveReviewModify = {moveReviewModify} moveList={moveList}></ReadComponent>
        </div>
     );
}
 
export default ReadPage;