import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";

const IndexPage = () => {
  return (
    <BasicLayout>
      <Outlet></Outlet>
    </BasicLayout>
  );
};

export default IndexPage;
