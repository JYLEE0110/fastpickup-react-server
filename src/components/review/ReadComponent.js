import { useEffect, useState } from "react";
import { readReply, readReview, registReview, removeReview } from "../../api/reviewAPI";
import { useSelector } from "react-redux";

const initState = {
  rno: "",
  pno: "",
  memberID: "",
  productName: "",
  reviewTitle: "",
  reviewContent: "",
  registDate: "",
  imgsName: [],
};

const replyInitState = {
  reviewTitle: "",
  reviewContent: "",
  pno: "",
  gno: "",
  memberID: "",
  imgsName: [],
};

const ReadComponent = ({ rno, moveReviewModify, moveList }) => {
  const [review, setReview] = useState(initState);
  const [reviewReply, setReviewReply] = useState(initState);
  const [reply, setReply] = useState(replyInitState);

  const { roleNames } = useSelector((state) => state.login);
  const { memberID } = useSelector((state) => state.login);

  useEffect(() => {
    readReview(rno).then((data) => {
      setReview(data);
    });

    readReply(rno).then((data) => {
      setReviewReply(data);
    });
  }, [rno]);

  useEffect(() => {
    setReply({
      ...reply,
      pno: review.pno,
      gno: review.rno,
      memberID: memberID,
    });
  }, [review]);

  //   console.log(reviewReply);

  const handleChange = (e) => {
    setReply({
      ...reply,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistReply = () => {
    registReview(reply)
      .then((res) => {
        moveList();
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

  const handleRemoveReview = () => {

    removeReview(rno)
    .then(res => {
      moveList()
      alert("리뷰가 정상적으로 삭제되었습니다.")
    })

  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">{review.reviewTitle}</h2>
      <p className="text-gray-600 mb-4">
        등록일자 : {review.registDate.slice(0, 10)}
      </p>
      <p className="text-gray-600 mb-4">작성자 : {review.memberID}</p>
      <p className="text-gray-600 mb-4">주문 상품 : {review.productName}</p>
      <div className="mb-6">
        {/* 게시글 내용 */}
        <p className="text-gray-800">{review.reviewContent}</p>
      </div>

      <div className="mb-6">
        {review.imgsName.length > 0 ? (
          <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3">
            {review.imgsName.map((fname, idx) => (
              <li
                key={idx}
                className="inline-block ml-2 first:ml-0 w-[130px] h-[130px] border border-[#eee] rounded-md overflow-hidden"
              >
                <img
                  src={`https://fastpickup-bucket.s3.ap-northeast-2.amazonaws.com/${fname}`}
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
        {!reviewReply.reviewContent && (
          <>
          <div>
        <button
          className="w-20 h-10 text-white bg-blue-700 rounded-md mr-2"
          onClick={() => moveReviewModify(rno, review.pno)}
        >
          수정
        </button>

        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md"
            onClick={handleRemoveReview}
        >
          삭제
        </button>
        </div>
        </>
        )}
        
      </div>

      {!reviewReply.reviewContent && roleNames.includes("ROLE_ADMIN") && ( // ROLE_ADMIN이 포함되어 있을 경우에만 답글 작성 폼을 렌더링
        <>
          <h4 className="text-lg font-semibold mb-4">답글 작성</h4>
          <div>
            <input
              type="text"
              name="reviewTitle"
              value={reply.reviewTitle}
              onChange={handleChange}
              placeholder="답글 제목"
              className="w-full p-2 border rounded-md mb-3"
            />
            <textarea
              name="reviewContent"
              value={reply.reviewContent}
              onChange={handleChange}
              placeholder="답글 내용"
              className="w-full p-2 border rounded-md mb-3"
              rows={4}
            />

            <div className="flex justify-end mt-5">
              <button
                className="w-20 h-10 text-white bg-[#ae2d33] rounded-md mr-2"
                onClick={handleRegistReply}
              >
                등록
              </button>
            </div>
          </div>
        </>
      )}

{reviewReply.reviewContent && ( // reviewReply에 데이터가 있는 경우에만 출력
  <li
    className={`my-3 py-3 border-b border-[#eee] `}
    style={{ maxWidth: "600px" }} // 최대 너비 설정
  >
    <div className="flex justify-between">
      <div className="w-[calc(100%-100px)]">
        <div className="mt-1 text-[15px] font-normal text-[#5f5f5f]">
          {reviewReply.memberID}
        </div>
        <div className="text-[17px] font-medium">
          {reviewReply.reviewContent}
        </div>
      </div>
      <div className="w-[90px]">
        <p className="text-sm leading-6 text-gray-900">
          {reviewReply.registDate.slice(0, 10)}
        </p>
      </div>
    </div>
    {reviewReply.imgsName.length > 0 ? (
      <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3">
        {reviewReply.imgsName.map((fname, idx) => (
          <li
            key={idx}
            className="inline-block ml-2 first:ml-0 w-[130px] h-[130px] border border-[#eee] rounded-md overflow-hidden"
          >
            <img
              src={`http://localhost/review/${fname}`}
              className="w-[130px]"
            />
          </li>
        ))}
      </ul>
    ) : (
      <></>
    )}
  </li>
)}
    </div>
  );
};

export default ReadComponent;
