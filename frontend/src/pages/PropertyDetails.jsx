import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../context";
import { formatPrice } from "../utils/formatPrice";
import { bookingProperty, verifyPayment } from "../services/apis";
import InputField from "../components/helpers/InputField";
import { BookingDatesRequiredNotification, PaymentFailedNotification, PaymentSuccessfulNotification } from "../components/notifications/notification";

export default function PropertyDetails() {
    const { propertyId } = useParams();
    const { user, properties } = useMainContext();
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

    const handleBookNow = async () => {
        if (!startDate || !endDate) {
            BookingDatesRequiredNotification();
            return;
        }
        try {
            const { data } = await bookingProperty({
                amount: Number(property?.price)
            });
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data?.amount,
                currency: data?.currency,
                name: "Property Booking",
                description: `Booking for ${property?.title}`,
                image: property?.images?.[0],
                order_id: data?.id,
                handler: async function (response) {
                    await verifyPayment({
                        userId: user?.id || user?.user?.id, 
                        propertyId: property?._id,
                        startDate, 
                        endDate,
                        totalAmount: data?.amount,
                        ...response
                    });
                    PaymentSuccessfulNotification();
                },
                prefill: {
                    name: user?.name || user?.user?.name || "John Doe",
                    email: user?.email || "john@example.com",
                },
                theme: { color: "#F97316" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            PaymentFailedNotification();
        }
    };

    if (!property) return null;

    return (
        <div className="min-h-screen px-4 md:px-10 py-10 bg-gradient-to-b from-gray-50 to-white">
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
                                method={(e) => setStartDate(e.target.value)}
                            />
                            <InputField 
                                labelName="To"
                                type="date"
                                value={endDate}
                                name={"endDate"}
                                method={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleBookNow}
                            className="w-[120px] bg-orange-500 hover:bg-orange-600 text-white font-semibold py-[5px] px-[10px] rounded shadow transition duration-200 ease-in-out"
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
                                    onClick={() => {setSelectedImg(img); window.scrollTo({ top: 0, behavior: 'smooth' });}}
                                    alt={`Property ${index}`}
                                    className={`w-full h-52 md:h-60 object-cover rounded-sm shadow cursor-pointer transition ${
                                        selectedImg === img ? "ring-4 ring-orange-500" : "hover:scale-105"
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
        </div>
    );
}