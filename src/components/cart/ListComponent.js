import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartList, removeCartItem } from "../../api/cartAPI";
import ListPageComponent from "../common/ListPageComponent";
import { getCartListThunk } from "../../reducers/cartSlice";

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

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    getCartList(memberID,queryObj).then((data) => {
      setCartList(data);

      // 반환된 리스트 데이터에서 cno, 수량을 순회하며 뽑아낸 뒤
      // 초기값 cno : 수량 으로 set해준다.
      const initialQuantities = {};
      data.list.forEach(({ cno, quantity }) => {
        initialQuantities[cno] = quantity;
      });
      setQuantities(initialQuantities);
    });
  }, [memberID,queryObj]);

  console.log(cartList)

  // 상품 수량 변경
  const handleQuantityChange = (cno, newQuantity) => {
    newQuantity = Math.max(1, parseInt(newQuantity, 10));
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cno]: newQuantity,
    }));
  };
  const handleRemoveCartItem = (cno) => {

    const newList = cartList.list.filter((ele) => ele.cno !== cno);

    setCartList({ ...cartList, list:newList });

    removeCartItem(cno).then(()=>{
      dispatch(getCartListThunk(memberID))
    })

  }
  
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
                onClick={() => handleRemoveCartItem(cno)}
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
