import React, { useEffect, useState } from "react";
import { getOrderList, order } from "../../api/orderAPI";
import ListPageComponent from "../common/ListPageComponent";

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

const Listcomponent = ({ queryObj, movePage, moveRead }) => {
  const [orderList, setOrderList] = useState({ ...initState });

  useEffect(() => {
    getOrderList(queryObj).then((data) => {
      setOrderList(data);
    });
  }, [queryObj]);

  const getStatusColor = (orderStatus) => {
    switch (orderStatus) {
      case "접수":
        return "text-blue-700"; // Change this to your desired color class
      case "완료":
        return "text-green-500"; // Change this to your desired color class
      case "반려":
        return "text-red-600"; // Change this to your desired color class
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-2xl font-bold mb-4">주문 내역</h1>
      <div className="flex flex-wrap -mx-4">
        {orderList.list.map(
          ({
            ono,
            memberID,
            orderDate,
            orderStatus,
            productName,
            imgName,
            quantity,
          }) => (
            <div
              key={ono}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
            >
                <p className="text-gray-600 mb-1">
                  <span className="font-bold">주문 번호:</span> {ono}
                </p>

              <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <div className="flex items-center justify-center mb-2"
                onClick={(()=>moveRead(ono))}>
                  <img
                    src={`http://localhost/product/${imgName}`}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>                
                <p className={`mb-1 ${getStatusColor(orderStatus)}`}>
                  <span className="font-bold">주문 상태:</span> {orderStatus}
                </p>
                <p>
                  <span className="font-bold">주문 메뉴:</span> {productName}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-bold">주문 날짜:</span> {orderDate}
                </p>

              </div>
            </div>
          )
        )}
      </div>
      <div>
        <ListPageComponent
          movePage={movePage}
          {...orderList}
        ></ListPageComponent>
      </div>
    </div>
  );
};

export default Listcomponent;
