import { useState } from "react";
import { postLoginThunk } from "../../reducers/loginSlice";
import { useDispatch} from "react-redux";

const initState = {
    username : "",
    password : ""
}
const LoginCOmponent = () => {
    
    const [loginInfo, setLoginInfo] = useState({...initState})
    const dispatch = useDispatch()

    const handleChange = ((e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
        
    })

    return ( 
        <div>
            <div>
                <input 
                    name = "username" 
                    value = {loginInfo.username}
                    onChange = {handleChange}
                />
                <input 
                    name = "password"
                    value = {loginInfo.password}
                    onChange = {handleChange}
                />
            </div>

            <div>
                <button onClick={() => dispatch(postLoginThunk(loginInfo))}>LOGIN</button>
            </div>
        </div>
     );
}
 
export default LoginCOmponent;