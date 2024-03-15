import { useEffect, useState } from "react";
import { readProduct } from "../../api/productAPI";

const initState = {
  pno: "",
  productName: "",
  productPrice: "",
  productContent: "",
  imgsName: [],
  registDate: "",
  categoryName: "",
};

const RegistComponent = ({pno}) => {
  const [product, setProduct] = useState({ ...initState });

  useEffect(() => {
    readProduct(pno).then((data) => {
      setProduct(data);
    });
  }, [pno]);
  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-md shadow-md">
    <h1 className="text-2xl font-bold mb-3">리뷰작성</h1>
      <h3 className="text-gray-600 mb-4">상품명 : {product.productName}</h3>
      <div className="mb-6">
        {/* 게시글 내용 */}
      </div>

      {/* 첨부 파일 목록 */}
      <div className="mb-6">
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

      {/* <div className="flex mt-5 justify-end">
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

      </div> */}
    </div>
  );
};

export default RegistComponent;
