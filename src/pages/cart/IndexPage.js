import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";

const IndexPage = () => {
    return ( 
        <div>
        <BasicLayout>
            <Outlet></Outlet>
        </BasicLayout>
        </div>
     );
}
 
export default IndexPage;