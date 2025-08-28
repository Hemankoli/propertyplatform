import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
    const [selectedIds, setSelectedIds] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getUser = async () => {
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
    };

    const fetchUsers = async () => {
        try {
            const users = await getAllUsers();
            setAllUsers(users);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProperties = async () => {
        try {
            const properties = await getAllProperties();
            const sortedProperties = properties.sort((a, b) => b.price - a.price);
            setProperties(sortedProperties);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllBookings = useMemo(() => async () => {
        try {
            const bookings = await getAllBookings();
            const sortedBookings = bookings?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
            setAllBookings(sortedBookings);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const fetchBookingsByUser = useMemo(() => async () => {
        try {
            const userId = user?.user?.id || user?.id;
            if (!userId) return;
            const bookings = await getBookingByUser(userId);
            const sortedBookings = bookings?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
            setBookings(sortedBookings);
        } catch (error) {
            console.log(error);
        }
    },[user]);

    useEffect(() => { getUser(); }, []);
    useEffect(() => { fetchUsers(); }, []);
    useEffect(() => { fetchProperties(); }, []);
    useEffect(() => { if (user) fetchAllBookings(); }, [user, fetchAllBookings]);
    useEffect(() => { if (user) fetchBookingsByUser(); }, [user, fetchBookingsByUser]);

    function onClose() {
        setSelectedIds(null);
        setModal(false); 
    }

    const isPropertyBooked = (propertyId) => {
        const now = new Date();
        return allBookings?.some(booking => {
            return (
                booking.property === propertyId &&
                new Date(booking?.endDate) >= now
            );
        });
    };

    const values = {
        modal, setModal,
        onClose,
        loader, setLoader,
        user, setUser,
        allUsers, setAllUsers,
        properties, setProperties,
        bookings, setBookings,
        selectedIds, setSelectedIds,
        allBookings, setAllBookings,
        startDate, setStartDate,
        endDate, setEndDate,
        isPropertyBooked,
        // Expose fetchers
        getUser,
        fetchUsers,
        fetchProperties,
        fetchAllBookings,
        fetchBookingsByUser
    };

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    );
};
