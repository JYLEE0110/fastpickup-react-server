import { useEffect, useState } from "react";
import { readProduct, removeProduct } from "../../api/productAPI";

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
  const [product, setProduct] = useState({...initState});

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
