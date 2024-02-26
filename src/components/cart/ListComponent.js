import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartList } from "../../api/cartAPI";
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

const ListComponent = ({ movePage, queryObj }) => {
  const { memberID } = useSelector((state) => state.login);

  const [cartList, setCartList] = useState({ ...initState });
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getCartList(memberID,queryObj).then((data) => {
      setCartList(data);

      const initialQuantities = {};
      data.list.forEach(({ cno, quantity }) => {
        initialQuantities[cno] = quantity;
      });
      setQuantities(initialQuantities);
    });
  }, [memberID,queryObj]);

  const handleQuantityChange = (cno, newQuantity) => {
    newQuantity = Math.max(1, parseInt(newQuantity, 10));
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cno]: newQuantity,
    }));
  };

  const handleOrderClick = () => {

  }

  // 전체 총액 계산
  const totalAmount = cartList.list
    .reduce((acc, { cno, productPrice }) => {
      const quantity = quantities[cno] || 1;
      return acc + productPrice * quantity;
    }, 0)
    .toLocaleString();

  return (
    <div className="container mx-auto my-5">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold mb-3">총액 : {totalAmount} 원</h1>
      <button
        onClick={handleOrderClick}
        className="bg-blue-700 text-white px-4 py-2 rounded mt-4 focus:outline-none"
      >
        주문하기
      </button>
      </div>
      <ul className="space-y-4">
        {cartList.list.map(({ cno, productName, productPrice, imgName }) => (
          <li
            key={cno}
            className="flex items-center justify-between p-3 border-b border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <img
                src={`http://localhost/product/${imgName}`}
                alt={productName}
                className="w-12 h-12 object-cover"
              />
              <div>
                <h3 className="text-base font-semibold">{productName}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              수량 :
              <input
                type="number"
                value={quantities[cno] || 1}
                onChange={(e) => handleQuantityChange(cno, e.target.value)}
                className="w-12 h-8 ml-2 border border-gray-300 rounded-md py-2 px-2 focus:outline-none"
              />
              <p className="font-semibold">
                Price:{" "}
                {(productPrice * (quantities[cno] || 1)).toLocaleString()} 원
              </p>
              <button
                // onClick={() => handleRemoveItem(cno)}
                className="text-red-500 focus:outline-none"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* <div>
        <ListPageComponent
          movePage={movePage}
          {...cartList}
        ></ListPageComponent>
      </div> */}
    </div>
  );
};

export default ListComponent;
