import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers, getAllProperties, getAllBookings, getBookingByUser } from "../services/apis";

const MainContext = createContext();
export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({children}) => {
    const [modal, setModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
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
        async function getUsers () {
            try {
                const users = await getAllUsers();
                setAllUsers(users)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers();
    }, [])


    // Getting All Properties
    useEffect(() => {
        async function getProperties () {
            try {
                const properties = await getAllProperties();
                const sortedProperties = properties.sort((a, b) => b.price - a.price);
                setProperties(sortedProperties);
            } catch (error) {
                console.log(error)
            }
        }
        getProperties();
    }, [])

    // Getting All Bookings
    useEffect(() => {
        async function getBookings () {
            try {
                const userId = user?.user?.id || user?.id;
                if(!userId) return;
                const bookings = await getAllBookings();
                const sortedBookings = bookings?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
                setAllBookings(sortedBookings);
            } catch (error) {
                console.log(error)
            }
        }
        getBookings();
    }, [user])

    // Getting Bookings By User
    useEffect(() => {
        async function getBooking () {
            try {
                const userId = user?.user?.id || user?.id;
                if(!userId) return;
                const bookings = await getBookingByUser(userId);
                const sortedBookings = bookings?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
                setBookings(sortedBookings);
            } catch (error) {
                console.log(error)
            }
        }
        getBooking();
    }, [user])


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
        selectedIds, setSelectedIds,
        allBookings, setAllBookings
    } 

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    );
}