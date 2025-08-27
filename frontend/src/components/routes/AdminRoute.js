import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import axios from 'axios';

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin-auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Authorization failed:', error.response ? error.response.data : error.message);
                setOk(false);
            }
        };
    
        if (token) authCheck();
    }, [token]);
    

  return (
    <div>
        {ok ? <Outlet/> : <Spinner path='' />}
    </div>
  )
}

export default AdminRoute
