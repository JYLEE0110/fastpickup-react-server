import { useParams } from "react-router-dom";
import useQueryObj from "../../hooks/useQueryObj";
import ReadComponent from "../../components/review/ReadComponent";

const ReadPage = () => {

    const{queryObj, moveModify ,moveList} = useQueryObj();

    const {rno} = useParams();

    return (
        <div>
            <ReadComponent rno ={rno} queryObj={queryObj} moveModify = {moveModify} moveList={moveList}></ReadComponent>
        </div>
     );
}
 
export default ReadPage;