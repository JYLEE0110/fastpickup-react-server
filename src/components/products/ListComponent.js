import { useEffect, useState } from "react"
import { getProductList } from "../../api/productAPI"

const initState = {
    list: [],
    endNum: 0,
    startNum: 0,
    nextBtn: false,
    prevBtn: false,
    pageNums: [],
    page: 0,
    size: 0,
    requestDTO: null
  }

const ListComponent = ({queryObj, movePage, moveRead}) => {
    
    const[productList, setProductList] = useState(initState)
    
    useEffect(() => {

        getProductList(queryObj).then((data) => {
            setProductList(data)
        })
        
    },[queryObj])
    
    console.log(productList)
    
    return ( 
        <div>

        </div>
     );
}
 
export default ListComponent;