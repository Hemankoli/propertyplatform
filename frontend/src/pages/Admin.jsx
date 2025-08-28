import React, { useMemo, useState } from "react";
import { DataTable, TabSwitcher, TotalsData } from "../components";
import { useMainContext } from "../context";
import { formatPrice } from "../utils/formatPrice";

export default function Admin() {
    const [activeTab, setActiveTab] = useState(localStorage.getItem('tabs') || "Users");
    const { allUsers, properties, allBookings, setModal, setSelectedIds } = useMainContext();

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
        localStorage.setItem('tabs', tab)
    }

    const propertyName = useMemo(() => (propertyId) => {
        const property = properties.find(prop => prop._id === propertyId);
        return property ? property.title : "Unknown Property";
    }, [properties]);

    const userName = useMemo(() => (userId) => {
        const user = allUsers.find(user => user._id === userId);
        return user ? user.name : "Unknown User";
    }, [allUsers]);

    const dataMap = useMemo(() => ({
        Users: {
            label: "Users",
            columns: ["Name", 'Email', 'Role', "Created At"],
            rows: allUsers?.map(user => ({
                Name: user?.name,
                Email: user?.email,
                Role: user?.role,
                'Created At': new Date(user.createdAt).toLocaleDateString()
            })) || [],
        },
        Properties: {
            label: "Properties",
            columns: ["Image", "Title", 'Location', 'Price', 'Action'],
            rows: properties?.map(property => ({
                Image: property?.images[0],
                Title: property?.title,
                Location: property?.location?.address,
                Price: formatPrice(property?.price),
                Action: <div className="flex items-center gap-2">
                    <button onClick={()=>{setModal("create-property-modal"); setSelectedIds(property?._id);}} 
                        className="bg-yellow-500 text-white p-1 rounded-sm hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button onClick={()=>{setModal("delete-property-modal");setSelectedIds(property?._id)}}
                        className="bg-red-400 text-white p-1 rounded-sm hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            })) || [],
        },
        Bookings: {
            label: "Bookings",
            columns: ["Property", 'User', 'Starting Date', 'Ending Date', "Days", "Status"],
            rows: allBookings?.map(booking => ({
                Property: propertyName(booking?.property),
                User: userName(booking?.user),
                'Starting Date': new Date(booking?.startDate).toLocaleDateString(),
                'Ending Date': new Date(booking?.endDate).toLocaleDateString(),
                Days: Math.ceil((new Date(booking?.endDate) - new Date(booking?.startDate)) / (1000 * 60 * 60 * 24)),
                Status:  <span className={`inline-block px-3 py-1 mt-3 rounded-sm text-sm font-medium 
                        ${ booking?.status === "Booked" ? "bg-green-100 text-green-700 border border-green-700"
                            : booking?.status === "Cancelled" ? "bg-yellow-100 text-yellow-700 border border-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {booking?.status}
                    </span>
            })) || [],
        },
    }), [allUsers, allBookings, properties, setModal, setSelectedIds, propertyName, userName]);

    const tabList = Object.keys(dataMap).map(key => ({key, label: dataMap[key].label}));

    return (
        <section className="bg-gray-100">
            <div className="max-w-[1400px] mx-auto md:px-10 px-4 py-10 min-h-screen">
                <TabSwitcher active={activeTab} tabs={tabList} onTabChange={handleChangeTab} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <TotalsData label={"Total Users"} count={dataMap["Users"]?.rows?.length} />
                    <TotalsData label={"Total Properties"} count={dataMap["Properties"]?.rows?.length} />
                    <TotalsData label={"Total Bookings"} count={dataMap["Bookings"]?.rows?.length} />
                </div>
                <DataTable
                    label={activeTab}
                    buttonLabel={"Add Property"}
                    columns={dataMap[activeTab]?.columns}
                    rows={dataMap[activeTab]?.rows}
                />
            </div>
        </section>
    );
}
