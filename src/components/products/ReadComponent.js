import { useEffect, useState } from "react";
import { readProduct } from "../../api/productAPI";

const initState = {
  pno: "",
  productName: "",
  productPrice: "",
  productContent: "",
  imgsName: [],
  registDate: "",
};

const ReadComponent = ({ pno, queryObj, moveList, moveModfiy }) => {
  const [product, setProduct] = useState({...initState});

  useEffect(() => {
    readProduct(pno).then((data) => {
      setProduct(data);
    });
  }, [pno]);

  console.log(product)

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">게시글 제목</h2>
      <p className="text-gray-600 mb-4">
        작성자: 작성자명 | 작성일: 2024-01-28
      </p>
      <div className="mb-6">
        {/* 게시글 내용 */}
        <p className="text-gray-800">
          게시글 내용이 여기에 들어갑니다. 여러 줄의 텍스트가 포함될 수
          있습니다.
        </p>
      </div>

      {/* 첨부 파일 목록 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">첨부 파일</h4>
        <ul className="list-disc pl-6">
          <li className="text-blue-500 hover:underline">
            <a href="#" target="_blank" rel="noopener noreferrer">
              첨부파일1.txt
            </a>
          </li>
          <li className="text-blue-500 hover:underline">
            <a href="#" target="_blank" rel="noopener noreferrer">
              첨부파일2.pdf
            </a>
          </li>
        </ul>
      </div>

      <div className="flex mt-5 justify-end">
        <button
          className="w-20 h-10 border border-[#ae2d33] rounded-md mr-2"
          onClick={moveList}
        >
          목록
        </button>
        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md"
          //   onClick={() => moveUpdate(review.rno)}
        >
          수정
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
