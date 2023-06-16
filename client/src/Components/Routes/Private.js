import axios from 'axios';
import {useState , useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

// ,{
//     headers:{
//         "Authorization" : authData?.token
//     }
// }

const Private = () => {
    const [ok , setOk] = useState(false);
    const authData = useSelector((state)=>state.authS)

    useEffect(()=>{
        const authCheck = async() =>{
            const res = await axios.get('/api/v1/auth/user-auth')
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(authData?.token) authCheck()
    },[authData?.token])


  return ok ? <Outlet/> : <Spinner/>
}

export default Private
