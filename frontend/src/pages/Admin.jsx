import React, { useMemo, useState } from "react";
import { DataTable, TabSwitcher } from "../components";
import { useMainContext } from "../context";
import { formatPrice } from "../utils/formatPrice";

export default function Admin() {
    const [activeTab, setActiveTab] = useState( "Users" || localStorage.getItem('tabs'));
    const { allUsers, properties, allBookings, setModal, setSelectedIds } = useMainContext();

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
        localStorage.setItem('tabs', tab)
    }

    
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
            columns: ["Property", 'User', 'Starting Date', 'Ending Date'],
            rows: allBookings?.map(booking => ({
                Property: booking?.property,
                User: booking?.user,
                'Starting Date': new Date(booking?.startDate).toLocaleDateString(),
                'Ending Date': new Date(booking?.endDate).toLocaleDateString(),
            })) || [],
        },
    }), [allUsers, allBookings, properties, setModal, setSelectedIds]);

    const tabList = Object.keys(dataMap).map(key => ({key, label: dataMap[key].label}));

    return (
        <div className="md:px-10 px-4 py-10 bg-gray-100 min-h-screen">
            <TabSwitcher active={activeTab} tabs={tabList} onTabChange={handleChangeTab} />
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                <p className="mt-2 text-3xl font-bold text-indigo-600">{allUsers?.length}</p>
                </div>
                <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-xl font-semibold text-gray-700">Total Bookings</h2>
                <p className="mt-2 text-3xl font-bold text-green-600">{allBookings?.length}</p>
                </div>
                <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-xl font-semibold text-gray-700">Total Properties</h2>
                <p className="mt-2 text-3xl font-bold text-blue-600">{properties?.length}</p>
                </div>
            </div>
            <DataTable
                label={activeTab}
                buttonLabel={"Add Property"}
                columns={dataMap[activeTab]?.columns}
                rows={dataMap[activeTab]?.rows}
            />
        </div>
    );
}
