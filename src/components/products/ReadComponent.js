import { useEffect, useState } from "react";
import { readProduct, removeProduct } from "../../api/productAPI";
import { setCookie } from "../../util/cookieUtil";
import { addCart } from "../../api/cartAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCartListThunk } from "../../reducers/cartSlice";
import { useNavigate } from "react-router-dom";


const initState = {
  pno: "",
  productName: "",
  productPrice: "",
  productContent: "",
  imgsName: [],
  registDate: "",
  categoryName : ""
};

const ReadComponent = ({ pno, queryObj, moveList, moveModify }) => {

  const {memberID} = useSelector(state => state.login)
  const navigate = useNavigate()

  console.log(memberID)
  // console.log(total)

  const dispatch = useDispatch()
  const [product, setProduct] = useState({...initState});
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    readProduct(pno).then((data) => {
      setProduct(data);
    });
  }, [pno]);

  console.log(product)

  const handleRemoveProduct = (() => {

    removeProduct(pno)
      .then(res => {
        moveList()
        alert("상품이 정상적으로 삭제되었습니다.")
      })

  })

  const handleAddToCart = () => {
    
    const cart = {
      shoppingCartDTO: {
        memberID: memberID
      },
      cartProductDTO: {
        pno : product.pno,
        quantity : quantity
      }
    }

    console.log(cart)

    addCart(cart)
      .then(res => {
        alert("장바구니에 담겼습니다")
      }).then(() =>
        dispatch(getCartListThunk(memberID))
      ).catch(() => {
        console.error("로그인 후 사용해주세요")
        alert("로그인 후 사용해주세요")
        navigate("/member/login")
      })
  }


  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-md shadow-md">
      
      <h2 className="text-3xl font-semibold mb-4">{product.productName}</h2>
      <p className="text-gray-600 mb-4">
        카테고리 : {product.categoryName}
      </p>
      <p className="text-gray-600 mb-4">
        가격 : {product.productPrice}원
      </p>
      <div className="mb-6">
        {/* 게시글 내용 */}
        <p className="text-gray-800">
          {product.productContent}
        </p>
      </div>

      {/* 첨부 파일 목록 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">첨부 파일</h4>
        {product.imgsName.length > 0 ? (
        <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3">
          {product.imgsName.map((fname, idx) => (
            <li
              key={idx}
              className="inline-block ml-2 first:ml-0 w-[130px] h-[130px] border border-[#eee] rounded-md overflow-hidden"
            >
              <img
                src={`http://localhost/product/${fname}`}
                className="w-[130px]"
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      </div>
      <div className="flex mt-5 justify-end">
      <button
          className="w-40 h-12 text-white bg-green-500 rounded-md mr-2"
          onClick={handleAddToCart}
        >
          장바구니 담기
        </button>

        {/* 수량 선택 */}
        <label className="flex items-center">
          수량:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
            className="w-12 h-8 ml-2 border border-gray-300 rounded-md py-2 px-2 focus:outline-none "
          />
        </label>
      </div>
      <div className="flex mt-5 justify-end">
        <button
          className="w-20 h-10 border border-[#ae2d33] rounded-md mr-2"
          onClick={moveList}
        >
          목록
        </button>
        <button
          className="w-20 h-10 text-white bg-blue-700 rounded-md mr-2"
            onClick={() => moveModify(pno)}
        >
          수정
        </button>

        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md"
            onClick={handleRemoveProduct}
        >
          삭제
        </button>

      </div>

      {/* 댓글 작성 폼
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">댓글 작성</h4>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              작성자
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              내용
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            댓글 작성
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default ReadComponent;
