import { useEffect, useState } from "react";
import { getProductList } from "../../api/productAPI";

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
  const [productList, setProductList] = useState(initState);

  useEffect(() => {
    getProductList(queryObj).then((data) => {
      setProductList(data);
    });
  }, [queryObj]);

  console.log(productList);

  return (
<div>
      <ul className="mt-3 ml-6">
        {productList.list.map(
          ({ pno, productName, productPrice, imgName, registDate }) => (
            <li key={pno} className="pb-3 mb-3 border-b border-[#eee]" style={{ fontSize: "14px" }}>
              <div className="flex">
                <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
                  <img
                    src={`http://172.29.99.60/product/${imgName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col ml-2">
                  <div className="text-[16px] font-medium mb-1">
                    {productName}
                    {/* {recStatus === 1 ? <img src={require(`../../images/product_recommend.png`)} className="inline-block w-[26px] ml-1 align-top" /> : ""} */}
                  </div>
                  <div className="text-[14px]">{productPrice.toLocaleString()}원</div>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ListComponent;
