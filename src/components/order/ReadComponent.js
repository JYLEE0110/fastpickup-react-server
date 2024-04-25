import { useEffect, useState } from "react";
import { readOrderInfo, modifyOrderStatus } from "../../api/orderAPI";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initState = {
  memberID: "",
  ono: "",
  orderDate: "",
  orderProduct: [],
  orderStatus: "",
};

const ReadComponent = ({ ono, queryObj, moveList }) => {
  const [orderInfo, setOrderInfo] = useState({ ...initState });

  const {roleNames} = useSelector((state) => state.login)
  const isAdmin = roleNames.includes('ROLE_ADMIN')

  const navigate = useNavigate()

  useEffect(() => {
    readOrderInfo(ono).then((data) => {
      setOrderInfo(data);
    });
  }, [ono]);

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedOrderInfo = { ...orderInfo, orderStatus: newStatus };
      setOrderInfo(updatedOrderInfo);

      const result = await modifyOrderStatus({
        ono: orderInfo.ono,
        orderStatus: newStatus,
      });

      alert(`주문이 ${newStatus} 되었습니다.`);

      console.log(result); // 서버 응답 확인

      // TODO: 상태 변경 후 필요한 동작 수행
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRegistBtn = (pno) =>{

    navigate(`/review/regist/${pno}`)

  }

  const getStatusColor = () => {
    switch (orderInfo.orderStatus) {
      case "접수":
        return "text-green-500";
      case "완료":
        return "text-blue-700";
      case "반려":
        return "text-red-600";
      default:
        return "";
    }
  };

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
        <strong>주문 상태:</strong>{" "}
        <span className={`font-bold ${getStatusColor()}`}>
          {orderInfo.orderStatus}
        </span>
      </div>
      <div className="mb-4">
        <strong>주문 제품:</strong>
        <ul className="list-disc ml-6">
          {orderInfo.orderProduct.map((product, index) => (
            <li key={index} className="flex items-center space-x-4 mb-3 mt-3">
              <img
                src={`https://fastpickup-bucket.s3.ap-northeast-2.amazonaws.com/${product.imgName}`}
                alt={product.productName}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <div className="font-bold">{product.productName}</div>
                  {orderInfo.orderStatus === "완료" && (
                    <button 
                      className="bg-blue-700 text-white px-4 py-2 rounded mr-10"
                      onClick={() => handleRegistBtn(product.pno)}>
                      리뷰쓰기
                    </button>
                  )}
                </div>
                <div>수량: {product.quantity}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isAdmin&&(
              <div className="mb-4">
              <div className="flex mt-2 justify-end">
                <button
                  onClick={() => handleStatusChange("접수")}
                  className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
                >
                  접수
                </button>
                <button
                  onClick={() => handleStatusChange("완료")}
                  className="mr-2 bg-blue-700 text-white px-4 py-2 rounded"
                >
                  완료
                </button>
                <button
                  onClick={() => handleStatusChange("반려")}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  반려
                </button>
              </div>
            </div>
      )}

    </div>
  );
};

export default ReadComponent;
