import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useMainContext } from '../../context';
import axios from 'axios';

const AdminRoute = () => {
    const { user } = useMainContext();
    const [ok, setOk] = useState(false)
    
    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin-auth`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
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
    
        if (user?.token) authCheck();
    }, [user?.token]);
    

  return (
    <div>
        {ok ? <Outlet/> : <Spinner path='' />}
    </div>
  )
}

export default AdminRoute
