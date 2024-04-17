import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const checkNull = (obj) => {
    const result = {}
  
    for (const attr in obj) {
      const attrName = attr
      const attrValue = obj[attr]
  
      if( attrValue && attrValue !== 'null'){
        result[attrName] = attrValue
      }
    }
  
    return result
  }

const useQueryObj = () => {
    
    const [search, setSearch] = useSearchParams()
    const navigate = useNavigate()

    const page = search.get("page") || 1
    const size = search.get("size") || 10
    const type = search.get("type")
    const keyword = search.get("keyword")
    const withDrawalStatus = search.get("withDrawalStatus")

    const queryObj = checkNull({page, size, type, keyword, withDrawalStatus})

    const moveList = () => {
        const queryString = createSearchParams(queryObj).toString()
    
        navigate(`../list?${queryString}`)
      }
    
      const moveRead = (num) => {
        //console.log("moveRead: ---" + num)
    
        const queryString = createSearchParams(queryObj).toString()
    
        navigate(`../read/${num}?${queryString}`)
      }
    
      const moveModify = (num) => {
        //console.log("moveUpdate: ---" + num)
    
        const queryString = createSearchParams(queryObj).toString()
    
        navigate(`../modify/${num}?${queryString}`)
      }

      const moveReviewModify = (num, pno) => {
        //console.log("moveUpdate: ---" + num)
    
        const queryString = createSearchParams(queryObj).toString()
    
        navigate(`../modify/${num}/${pno}?${queryString}`)
      }


      return {setSearch, queryObj, moveList, moveRead, moveModify, moveReviewModify}
}
 
export default useQueryObj;