import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MainContext = createContext();
export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({children}) => {
    const [modal, setModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedIds, setSelectedIds] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
            try {
                setUser(JSON.parse(user));
            } catch (err) {
                console.error("Failed to parse user from localStorage", err);
                localStorage.removeItem("user");
            }
        }
    }, []);


    useEffect(() => {
        async function getAllUsers () {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-users`);
                setAllUsers(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllUsers();
    }, [])


    // Getting All Properties
    useEffect(() => {
        async function getAllProperties () {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-properties`);
                const sortedProperties = res.data.sort((a, b) => b.price - a.price);
                setProperties(sortedProperties);
            } catch (error) {
                console.log(error)
            }
        }
        getAllProperties();
    }, [])

    function onClose(){
        setSelectedIds(null);
        setModal(false);
    }

    const values = {
        modal, setModal,
        onClose,
        loader, setLoader,
        user, setUser,
        allUsers, setAllUsers,
        properties, setProperties,
        bookings, setBookings,
        selectedIds, setSelectedIds
    } 

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    );
}