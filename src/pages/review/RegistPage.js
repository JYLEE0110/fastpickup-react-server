import { useParams } from "react-router-dom";
import RegistComponent from "../../components/review/RegistComponent";

const RegistPage = () => {

    const {pno} = useParams();

    console.log(pno)

    return ( 
        <div>
            <RegistComponent pno={pno}></RegistComponent>
        </div>
     );
}
 
export default RegistPage;