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
<div className="container mx-auto my-5">
  <h1 className="text-2xl font-bold mb-3">Product List</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {productList.list.map(
      ({ pno, productName, productPrice, imgName, categoryName }) => (
        <div
          key={pno}
          className="p-4 border rounded-md hover:shadow-lg transition duration-300"
          onClick={() => moveRead(pno)}
        >
          <div className="flex">
            <div className="w-20 h-20 overflow-hidden rounded-full">
              <img
                src={`http://localhost/product/${imgName}`}
                className="w-full h-full object-cover"
                alt={productName}
              />
            </div>
            <div className="flex flex-col ml-2">
              <div className="text-lg font-semibold mb-1">{productName}</div>
              <div className="text-gray-500">
                category : {categoryName}
              </div>
              <div className="text-gray-500">
                Price: {productPrice.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      )
    )}
  </div>
</div>
<div className="float-right top-4 right-4">
  <button
    className="bg-[#dc4a51] text-white mr-5 px-4 py-2 rounded-md mt-5"
    onClick={() => navigate("../regist")}
  >
    상품 등록
  </button>
</div>
<div>
  <ListPageComponent movePage={movePage} {...productList}></ListPageComponent>
</div>
    </div>
  );
};

export default ListComponent;
