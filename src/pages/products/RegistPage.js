import { useNavigate } from "react-router-dom";
import RegistComponent from "../../components/products/RegistComponent";

const RegistPage = () => {

    const navigate = useNavigate();

    const moveList = () => {
        navigate("../list")
      }

    return(
        <div>
            <RegistComponent moveList={moveList}></RegistComponent>
        </div>
    );
};

export default RegistPage;
