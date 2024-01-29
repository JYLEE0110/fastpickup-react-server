import { useParams } from "react-router-dom";
import useQueryObj from "../../hooks/useQueryObj";
import ModifyComponent from "../../components/products/ModifyComponent";

const ModifyPage = () => {

    const{queryObj ,moveRead, moveList} = useQueryObj();

    const {pno} = useParams();

    return ( 
        <div>
            <ModifyComponent pno ={pno} moveRead={moveRead} moveList = {moveList} ></ModifyComponent>
        </div>
     );
}
 
export default ModifyPage;