import { useEffect, useState } from "react";
import { getProductReviewList } from "../../api/reviewAPI";
import ListPageComponent from "../common/ListPageComponent";

const initState = {
  list: [],
  endNum: 0,
  startNum: 0,
  nextBtn: false,
  prevBtn: false,
  pageNums: [],
  page: 1,
  size: 0,
  requestDTO: null,
};

const ReviewComponent = ({ pno }) => {
  const [review, setReview] = useState({ ...initState });

  const movePage = (num) => {
    review.page = num;
    //console.log(storeReview.page);
    setReview({ ...review });
  };

  useEffect(() => {
    getProductReviewList(pno, review.page).then((data) => {
      setReview(data);
    });
  }, [pno, review.page]);

  console.log(review);

  // Conditionally render the div only if there are reviews available
  return (
    <>
      {review.list.length > 0 && ( // Check if review list is not empty
        <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-md shadow-md">
          <ul>
            {review.list.map(
              ({
                rno,
                gno,
                memberID,
                reviewContent,
                reviewTitle,
                imgName,
                registDate,
              }) => (
                <li
                  className={`my-3 py-3 border-b border-[#eee] ${
                    rno === gno ? "bg-white" : "bg-gray-200"
                  } ${rno !== gno ? "ml-3 px-3 pb-4 rounded-md" : ""}`}
                  key={rno}
                  style={{ maxWidth: "600px" }} // 최대 너비 설정
                >
                  <div className="flex justify-between">
                    <div className="w-[calc(100%-100px)]">
                      <div className="mt-1 text-[15px] font-normal text-[#5f5f5f]">
                        {rno !== gno ? "사장님" : memberID}
                      </div>
                      <div className="text-[17px] font-medium">
                        {reviewContent}
                      </div>
                    </div>
                    <div className="w-[90px]">
                      <p className="text-sm leading-6 text-gray-900">
                        {registDate.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  {imgName && (
                    <ul className="mt-3 overflow-x-auto overflow-y-hidden whitespace-nowrap">
                      <img
                        src={`https://fastpickup-bucket.s3.ap-northeast-2.amazonaws.com/${imgName}`}
                        className="w-[120px]"
                      />
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
          <ListPageComponent
            {...review}
            movePage={movePage}
          ></ListPageComponent>
        </div>
      )}
    </>
  );
};

export default ReviewComponent;
