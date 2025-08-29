import React, { useEffect, useState } from 'react'
import { useMainContext } from '../../context';
import { bookingProperty, verifyPayment } from "../../services/apis";
import { PaymentFailedNotification, PaymentSuccessfulNotification } from "../notifications/notification";
import { formatPrice } from '../../utils/formatPrice';
import ModalLayout from '../layouts/ModalLayout';
import { useNavigate } from 'react-router-dom';

export default function Payment({property, startDate, endDate}) {
    const { user, setModal, fetchAllBookings, fetchBookingsByUser } = useMainContext();
    const [days, setDays] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (startDate && endDate) {
            const diffTime = new Date(endDate) - new Date(startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDays(diffDays > 0 ? diffDays : 0);
        }
    }, [startDate, endDate]);
    
    const pricePerDay = ((property?.price / 30) * days).toFixed(2);
    
    const handleBookNow = async () => {
        try {
            const data = await bookingProperty({amount: pricePerDay});
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data?.amount,
                currency: "INR",
                order_id: data?.order_id,
                name: "Eastatly",
                description: "",                
                handler: async function (response) {
                    await verifyPayment({
                        userId: user?.user?.id || user?.id,
                        propertyId: property?._id,
                        startDate,
                        endDate,
                        totalAmount: pricePerDay,
                        razorpay_order_id: response?.razorpay_order_id,
                        razorpay_payment_id: response?.razorpay_payment_id,
                        razorpay_signature: response?.razorpay_signature
                    });
                    PaymentSuccessfulNotification();
                    await fetchAllBookings();   
                    await fetchBookingsByUser();
                    setModal(false);
                    navigate("/dashboard/account");
                    window.scrollTo({ top: 0, behavior: "smooth" })
                },
                prefill: {
                    name: user?.user?.name || user?.name || "John Doe",
                    email: user?.user?.email || "john@example.com",
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

    return (
        <ModalLayout>
            <h1 className="text-2xl text-center font-bold mb-6 text-gray-800">Booking Summary</h1>

            <div className="flex items-center flex-col md:flex-row gap-6 mb-6">
                <img
                    src={property?.images?.[0]}
                    alt={property?.title}
                    className="w-40 h-28 object-cover rounded-sm"
                />
                <div>
                    <h2 className="text-xl font-semibold">{property?.title}</h2>
                    <p className="text-gray-600">{property?.location?.address}</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-lg"><span className="font-semibold">From:</span> {startDate}</p>
                <p className="text-lg"><span className="font-semibold">To:</span> {endDate}</p>
                <p className="text-lg"><span className="font-semibold">Days:</span> {days} {days === 1 ? "day" : "days"}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-lg font-semibold">Price per month: ₹{formatPrice(property?.price)}</p>
                <p className="text-lg">
                    <span className="font-semibold">Total Price: </span> 
                    ₹{formatPrice(((property?.price / 30) * days)?.toFixed(2))}
                </p>
            </div>
            <button
                onClick={handleBookNow}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition duration-200"
            >
                Proceed to Pay
            </button>
        </ModalLayout>
    )
}
