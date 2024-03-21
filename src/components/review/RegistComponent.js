import { useEffect, useRef, useState } from "react";
import { readProduct } from "../../api/productAPI";
import { reviewRemoveFile, reviewUploadFile } from "../../api/fileAPI";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { registReview } from "../../api/reviewAPI";

const initState = {
  pno: "",
  productName: "",
  productPrice: "",
  productContent: "",
  imgsName: [],
  registDate: "",
  categoryName: "",
};

const reviewInitState = {
  reviewTitle: "",
  reviewContent: "",
  pno: "",
  gno : "0",
  memberID: "",
  imgsName: [],
};

const RegistComponent = ({ pno }) => {
  
  const {memberID} = useSelector(state => state.login)

  const [product, setProduct] = useState({ ...initState });
  const [review, setReview] = useState({
    ...reviewInitState,
    pno: pno,
    memberID: memberID,
  });

  const navigate = useNavigate()

  const fileRef = useRef();

  useEffect(() => {
    readProduct(pno).then((data) => {
      setProduct(data);
    });
  }, [pno]);

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistReview = () => {
    registReview(review)
      .then((res) => {
        alert("리뷰 등록이 완료되었습니다.")
        navigate(`/product/read/${pno}`)
      })
      .catch((error) => {
        if (error.response) {
          console.error("서버 응답 에러:", error.response.data);
        } else if (error.request) {
          console.error("요청 에러:", error.request);
        } else {
          console.error("일반적인 에러:", error.message);
        }
      });
  };
  const handleCancelBtn = () => {
    navigate(-1);
  };

  const handleClickDelImg = (fname) => {
    const newArr = review.imgsName.filter((ele) => ele !== fname);

    review.imgsName = newArr;

    setReview({ ...review });

    reviewRemoveFile(fname);
  };

  const handleFileUpload = () => {
    const formData = new FormData();

    // // 새로 추가되는 파일 추가
    const arr = fileRef.current.files;

    for (let file of arr) {
      formData.append("file", file);
    }

    console.dir(fileRef.current);

    // uploadFile 함수를 호출하여 파일 업로드
    reviewUploadFile(formData)
      .then((res) => {
        const result = res;
        //console.log(result)

        const link = result.map((item) => item.link);
        const upDatefileNames = link.map((link) => link.substring(2)); // "s_" 제외한 부분 추출

        //console.log(upDatefileNames)
        const updatedFileNames = [...review.imgsName, ...upDatefileNames];

        // 상태 업데이트
        setReview({
          ...review,
          imgsName: updatedFileNames,
        });
      })
      .catch((error) => {
        console.error("File upload error:", error);
      });

    fileRef.current.value = null;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-3">리뷰작성</h1>
      <div className="flex mb-6">
        <div className="mr-10">
          <h3 className="text-gray-600 mb-4">상품명 : {product.productName}</h3>
          {product.imgsName.length > 0 && (
            <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3">
              {product.imgsName.map((fname, idx) => (
                <li
                  key={idx}
                  className="inline-block ml-2 first:ml-0 w-[130px] h-[130px] border border-[#eee] rounded-md overflow-hidden"
                >
                  <img
                    src={`http://localhost/product/${fname}`}
                    className="w-[130px]"
                    alt={`Product Image ${idx + 1}`}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <input
            type="text"
            name="reviewTitle"
            value={review.reviewTitle}
            onChange={handleChange}
            placeholder="리뷰 제목"
            className="w-full p-2 border rounded-md mb-3"
          />
          <textarea
            name="reviewContent"
            value={review.reviewContent}
            onChange={handleChange}
            placeholder="리뷰 내용"
            className="w-full p-2 border rounded-md mb-3"
            rows={4}
          />
          <input
            type="file"
            ref={fileRef}
            multiple
            name="imgsName"
            onChange={handleFileUpload}
          />
          <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3 py-3">
            {review.imgsName.map((fname, idx) => (
              <li
                key={idx}
                className="relative inline-block ml-2 first:ml-0 w-[130px] h-[130px] border border-[#eee] rounded-md"
              >
                <button
                  className="bg-[#ae2d33] absolute -right-1 -top-2 w-7 h-7 text-white rounded-full"
                  onClick={() => handleClickDelImg(fname)}
                >
                  X
                </button>
                <div className="overflow-hidden w-[130px] h-[130px]">
                  <img
                    src={`http://localhost/review/${encodeURIComponent(fname)}`}
                    className="w-[130px]"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-5">
            <button
              className="w-20 h-10 text-white bg-[#ae2d33] rounded-md mr-2"
              onClick={handleRegistReview}
            >
              등록
            </button>
            <button
              className="w-20 h-10 border border-[#ae2d33] rounded-md"
              onClick={handleCancelBtn}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistComponent;
