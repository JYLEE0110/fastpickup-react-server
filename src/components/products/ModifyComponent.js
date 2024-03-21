import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { modifyProduct, readProduct } from "../../api/productAPI";
import { productRemoveFile, productUploadFile } from "../../api/fileAPI";

const ModifyComponent = ({pno, moveRead, moveList}) => {
    
      const initState = {
        pno: "",
        productName: "",
        productPrice: "",
        productContent: "",
        imgsName: [],
      };
    
      const [product, setProduct] = useState({ ...initState });
    
      useEffect(() => {
        readProduct(pno).then((data) => {

            setProduct(data)

        });
      }, [pno]);
    
      console.log(product)

      const navigate = useNavigate();
      const fileRef = useRef();
    
      const handleChange = (e) => {
        product[e.target.name] = e.target.value;
    
        setProduct({ ...product });
      };
    
      const handleModifyProduct = () => {
        modifyProduct(product)
          .then(res => {
            moveList();
          })
          .catch(error => {
            if (error.response) {
              console.error('서버 응답 에러:', error.response.data);
            } else if (error.request) {
              console.error('요청 에러:', error.request);
            } else {
              console.error('일반적인 에러:', error.message);
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
    
        productRemoveFile(fname)
      };
    
      const handleChangeFile = () => {
        const formData = new FormData();
    
        // // 새로 추가되는 파일 추가
        const arr = fileRef.current.files;
        for (let file of arr) {
          formData.append("file", file);
        }
    
        console.dir(fileRef.current);
    
        // uploadFile 함수를 호출하여 파일 업로드
        productUploadFile(formData)
          .then((res) => {
            const result = res
            //console.log(result)
    
            const link = result.map((item) => item.link);
            const upDatefileNames = link.map((link) => link.substring(2)) // "s_" 제외한 부분 추출
    
            //console.log(upDatefileNames)
            const updatedFileNames = [...product.imgsName, ...upDatefileNames]
    
            // 상태 업데이트
            setProduct({
              ...product,
              imgsName: updatedFileNames,
            });
          })
          .catch((error) => {
            console.error("File upload error:", error)
          })
    
        fileRef.current.value = null;
      };
    
      return (
        <div className=" pl-[100px] w-10/12">
          <div className="py-3 text-center text-xl font-semibold leading-normal border-b border-[#ccc]">
            상품수정
          </div>
          <dl>
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
                onChange={handleChangeFile}
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
                    <img src={`http://localhost/product/${encodeURIComponent(fname)}`} className="w-[130px]" />
                    </div>
                  </li>
                ))}
          </ul>
          <div className="flex justify-end mt-5">
            <button
              className="w-20 h-10 text-white bg-[#ae2d33] rounded-md mr-2"
              onClick={handleModifyProduct}
            >
              수정
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
}
 
export default ModifyComponent;