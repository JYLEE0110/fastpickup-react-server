import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryList } from "../../api/categoryAPI";
import { removeFile, uploadFile } from "../../api/fileAPI";
import { registProduct } from "../../api/productAPI";

const RegistComponent = ({ moveList }) => {
  const initStateCategory = {
    categoryList: [],
  };

  const initState = {
    pno: "",
    cno: "",
    productName: "",
    productPrice: "",
    productContent: "",
    imgsName: [],
  };

  const [product, setProduct] = useState({ ...initState });
  const [category, setCategory] = useState({ ...initStateCategory });
  const [error, setError] = useState(null); // 상태 추가

  useEffect(() => {
    getCategoryList().then((data) => {
      setCategory(data);
    });
  }, []);

  console.log(category);

  const navigate = useNavigate();
  const fileRef = useRef();

  const handleChange = (e) => {
    product[e.target.name] = e.target.value;

    setProduct({ ...product });
  };

  const handleRegistProduct = () => {
    registProduct(product)
      .then((res) => {
        moveList();
      })
      .catch((error) => {
        if (error.response) {
          console.error("서버 응답 에러:", error.response.data);
          setError('서버 응답 에러: ' + error.response.data.message);
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
    const newArr = product.imgsName.filter((ele) => ele !== fname);

    product.imgsName = newArr;

    setProduct({ ...product });

    removeFile(fname);
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
    uploadFile(formData)
      .then((res) => {
        const result = res;
        console.log(result)

        const link = result.map((item) => item.link);
        const upDatefileNames = link.map((link) => link.substring(2)); // "s_" 제외한 부분 추출

        //console.log(upDatefileNames)
        const updatedFileNames = [...product.imgsName, ...upDatefileNames];

        // 상태 업데이트
        setProduct({
          ...product,
          imgsName: updatedFileNames,
        });
      })
      .catch((error) => {
        console.error("File upload error:", error);
      });

    fileRef.current.value = null;
  };

  return (
    <div className=" pl-[100px] w-10/12">
      <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
        상품등록
      </div>
      <dl>
        <dt className="mt-5">카테고리</dt>
        <dd className="mt-2">
          <select
            className="w-full h-10 px-2 border border-[#ccc]"
            name="cno"
            value={product.cno}
            required
            onChange={handleChange}
          >
            <option value="" disabled>
              카테고리를 선택하세요
            </option>
            {category.categoryList &&
              category.categoryList.map((categoryItem) => (
                <option key={categoryItem.cno} value={categoryItem.cno}>
                  {categoryItem.categoryName}
                </option>
              ))}
          </select>
        </dd>

        <dt className="mt-5">상품명</dt>
        <dd className="mt-2">
          <input
            className="w-full h-10 px-2 border border-[#ccc]"
            type="text"
            name="productName"
            value={product.productName}
            required
            onChange={handleChange}
          />
        </dd>

        <dt className="mt-5">상품가격</dt>
        <dd className="mt-2">
          <input
            type="number"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
            className="w-full h-10 px-2 border border-[#ccc] rounded-md"
            placeholder="상품 가격을 입력하세요"
          />
        </dd>

        <dt className="mt-5">상품설명</dt>
        <dd className="mt-2">
          <textarea
            name="productContent"
            value={product.productContent}
            onChange={handleChange}
            className="w-full h-[100px] p-2 border border-[#ccc] resize-none"
          />
        </dd>
        <dt className="mt-5">이미지</dt>
        <dd className="mt-2">
          <input
            type="file"
            ref={fileRef}
            multiple
            name="imgsName"
            onChange={handleFileUpload}
          />
        </dd>
      </dl>
      <ul className="overflow-x-auto overflow-y-hidden whitespace-nowrap mt-3 py-3">
        {product.imgsName.map((fname, idx) => (
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
                src={`https://fastpickup-bucket.s3.ap-northeast-2.amazonaws.com/${encodeURIComponent(fname)}`}
                className="w-[130px]"
              />
            </div>
          </li>
        ))}
      </ul>
      {error && ( 
          <p className="text-red-500 mb-4">{error}</p>
        )}
      <div className="flex justify-end mt-5">
        <button
          className="w-20 h-10 text-white bg-[#ae2d33] rounded-md mr-2"
          onClick={handleRegistProduct}
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
  );
};

export default RegistComponent;
