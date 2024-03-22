import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyPageReviewList } from "../../api/reviewAPI";
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

const ListComponent = ({ queryObj, movePage, moveRead}) => {
  const [review, setReview] = useState({ ...initState });
  const { memberID } = useSelector((state) => state.login);

  useEffect(() => {
    getMyPageReviewList(queryObj, memberID).then((data) => {
      setReview(data);
    });
  }, [memberID, queryObj]);

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-2xl font-bold mb-3">Review List</h1>
      {review.list.map(({ rno, reviewTitle, productName, imgName, registDate }) => (
        <div key={rno} className="border p-4 mb-4 flex" onClick={() => moveRead(rno)}>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">{reviewTitle}</h2>
            <p className="text-gray-600">주문상품: {productName}</p>
            <div className="w-20 h-20 overflow-hidden rounded-full">
              <img
                src={`http://localhost/review/${imgName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-gray-600">{registDate.slice(0, 10)}</p>
        </div>
      ))}
      <div>
        <ListPageComponent
          movePage={movePage}
          {...review}
        ></ListPageComponent>
      </div>
    </div>
  );
};

export default ListComponent;
