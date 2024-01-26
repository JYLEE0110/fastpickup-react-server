import { useEffect, useState } from "react";
import { getProductList } from "../../api/productAPI";
import ListPageComponent from "../common/ListPageComponent";
import { useNavigate } from "react-router-dom";

const initState = {
  list: [],
  endNum: 0,
  startNum: 0,
  nextBtn: false,
  prevBtn: false,
  pageNums: [],
  page: 0,
  size: 0,
  requestDTO: null,
};

const ListComponent = ({ queryObj, movePage, moveRead }) => {

  const [productList, setProductList] = useState({...initState});
  const navigate = useNavigate();

  useEffect(() => {
    getProductList(queryObj).then((data) => {
      setProductList(data);
    });
  }, [queryObj]);

  console.log(productList);

  return (
    <div>
      <div>
        <ul className="mt-3 ml-6">
          {productList.list.map(
            ({ pno, productName, productPrice, imgName, registDate }) => (
              <li
                key={pno}
                className="pb-3 mb-3 border-b border-[#eee]"
                style={{ fontSize: "14px" }}
                onClick={() => moveRead(pno)}
              >
                <div className="flex">
                  <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
                    <img
                      src={`http://localhost/product/${imgName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    <div className="text-[16px] font-medium mb-1">
                      {productName}
                      {/* {recStatus === 1 ? <img src={require(`../../images/product_recommend.png`)} className="inline-block w-[26px] ml-1 align-top" /> : ""} */}
                    </div>
                    <div className="text-[14px]">
                      {productPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="float-right top-4 right-4">
        <button className="bg-[#dc4a51] text-white mr-5 px-4 py-2 rounded-md mt-5"
                onClick = {() => navigate("../regist")}>
          상품 등록
        </button>
      </div>

      <div>
        <ListPageComponent
          movePage={movePage}
          {...productList}
        ></ListPageComponent>
      </div>
    </div>
  );
};

export default ListComponent;
