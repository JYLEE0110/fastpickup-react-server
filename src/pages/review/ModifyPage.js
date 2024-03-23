import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/review/ModifyComponent";
import useQueryObj from "../../hooks/useQueryObj";

const ModifyPage = () => {


    const{queryObj ,moveRead, moveList} = useQueryObj();

    const {rno, pno} = useParams()

    console.log(pno)

    return ( 
        <div> 
            <ModifyComponent rno ={rno} pno = {pno} moveRead={moveRead} moveList={moveList}></ModifyComponent>
        </div>
     );
}
 
export default ModifyPage;