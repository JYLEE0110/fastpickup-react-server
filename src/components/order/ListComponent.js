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
        return "bg-green-500 text-white"; // 주황색 버튼
      case "완료":
        return "bg-blue-700 text-white"; // 파랑색 버튼
      case "반려":
        return "bg-red-600 text-white"; // 빨강색 버튼
      default:
        return "bg-gray-500 text-white"; // 회색 버튼
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
                <div
                  className="flex items-center justify-center mb-2"
                  onClick={() => moveRead(ono)}
                >
                  <img
                    src={`http://localhost/product/${imgName}`}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
                <button
                  className={`mb-1 py-1 px-2 rounded-md ${getStatusColor(
                    orderStatus
                  )}`}
                >
                  <span className="font-bold">주문 상태:</span> {orderStatus}
                </button>
                <p>
                  <span className="font-bold">주문 메뉴:</span> {productName}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-bold">주문 날짜:</span> {orderDate}
                </p>
                {/* 리뷰 작성 가능 문구 */}
                {orderStatus === "완료" && (
                  <p className="text-blue-600 font-bold mt-2">리뷰 작성 가능</p>
                )}
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
