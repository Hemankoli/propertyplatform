import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../context";
import { formatPrice } from "../utils/formatPrice";
import InputField from "../components/helpers/InputField";
import { Payment } from "../components";
import { BookingDatesInvalidNotification, BookingDatesRequiredNotification } from "../components/notifications/notification";

export default function PropertyDetails() {
    const { propertyId } = useParams();
    const { modal, setModal, properties, isPropertyBooked } = useMainContext();
    const [property, setProperty] = useState(null);
    const [selectedImg, setSelectedImg] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const foundProperty = properties?.find((prop) => prop?._id === propertyId);
        setProperty(foundProperty);
        if (foundProperty?.images?.length) {
            setSelectedImg(foundProperty.images[0]);
        }
    }, [propertyId, properties]);

    if (!property) return null;

    function proceedPayment(){
        if (!startDate || !endDate) return BookingDatesRequiredNotification();
        if (new Date(startDate) >= new Date(endDate)) return BookingDatesInvalidNotification();
        setModal("payment-modal");
    }

    return (
        <div className="max-w-[1400px] mx-auto min-h-screen px-4 md:px-10 py-10 bg-gradient-to-b from-gray-50 to-white">
            <div className="bg-white rounded shadow overflow-hidden">
                <div className="relative w-full h-96 md:h-[40rem]">
                    <img
                        src={selectedImg}
                        alt={property?.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                            {property?.title}
                        </h1>
                    </div>
                    {isPropertyBooked(property?._id) && (
                        <div className="absolute top-2 left-2 text:md md:text-xl bg-red-500 text-white md:px-5 px-3 py-1 md:py-3 rounded-sm font-semibold shadow-md">
                            Already Booked
                        </div>
                    )}
                </div>

                <div className="p-6 md:p-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <p className="text-3xl font-bold text-orange-600 mb-4 md:mb-0">
                            ₹{formatPrice(property?.price)}
                            <span className="text-lg font-medium text-gray-500"> /month</span>
                        </p>

                        {/* Date selection */}
                        <div className="flex gap-2 items-center">
                            <InputField
                                labelName="From"
                                type="date"
                                value={startDate}
                                name={"startDate"}
                                method={(e) => {
                                    const newStart = e.target.value;
                                    setStartDate(newStart);
                                    if (!endDate || new Date(endDate) <= new Date(newStart)) {
                                    const nextDay = new Date(new Date(newStart).getTime() + 24 * 60 * 60 * 1000);
                                    setEndDate(nextDay.toISOString().split("T")[0]);
                                    }
                                }}
                                min={new Date().toISOString().split("T")[0]} 
                            />
                            <InputField
                                labelName="To"
                                type="date"
                                value={endDate}
                                name={"endDate"}
                                method={(e) => setEndDate(e.target.value)}
                                min={ startDate
                                    ? new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                                    : new Date().toISOString().split("T")[0]
                                }
                            />
                        </div>
                        <button onClick={proceedPayment}
                        disabled={isPropertyBooked(property?._id)}
                            className={`w-[120px] bg-orange-500 hover:bg-orange-600 ${isPropertyBooked(property?._id) ? "cursor-not-allowed opacity-50" : "cursor-pointer"} text-white font-semibold py-[5px] px-[10px] rounded shadow transition duration-200 ease-in-out`}
                        >
                            Book Now
                        </button>
                    </div>

                    {property?.images?.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                            {property?.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    onClick={() => { setSelectedImg(img); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    alt={`Property ${index}`}
                                    className={`w-full h-52 md:h-60 object-cover rounded-sm shadow cursor-pointer transition ${selectedImg === img ? "ring-4 ring-orange-500" : "hover:scale-105"
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Description</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{property?.description}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Location</h2>
                        <p className="text-gray-600 text-lg">{property?.location?.address}</p>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Contact Owner</h2>
                            <p className="text-gray-700">📞 +91 9876543210</p>
                            <p className="text-gray-700">✉️ seller@propertymail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            {modal === "payment-modal" && <Payment property={property} startDate={startDate} endDate={endDate} />}
        </div>
    );
}