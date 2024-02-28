import { useEffect, useState } from "react";
import { readOrderInfo } from "../../api/orderAPI";

const initState = {
  memberID: "",
  ono: "",
  orderDate: "",
  orderProduct: [],
  orderStatus: "",
};

const ReadComponent = ({ ono, queryObj, moveList }) => {
  const [orderInfo, setOrderInfo] = useState({ ...initState });

  useEffect(() => {
    readOrderInfo(ono).then((data) => {
      setOrderInfo(data);
    });
  }, [ono]);

  console.log(orderInfo);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">주문 상세 정보</h1>
      <div className="mb-4">
        <strong>주문 번호:</strong> {orderInfo.ono}
      </div>
      <div className="mb-4">
        <strong>주문자 ID:</strong> {orderInfo.memberID}
      </div>
      <div className="mb-4">
        <strong>주문 일자:</strong> {orderInfo.orderDate}
      </div>
      <div className="mb-4">
        <strong>주문 상태:</strong> {orderInfo.orderStatus}
      </div>
      <div className="mb-4">
        <strong>주문 제품:</strong>
        <ul className="list-disc ml-6">
          {orderInfo.orderProduct.map((product, index) => (
            <li key={index} className="flex items-center space-x-4">
              <img
                src={`http://localhost/product/${product.imgName}`}
                alt={product.productName}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <div className="font-bold">{product.productName}</div>
                <div>수량: {product.quantity}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReadComponent;
