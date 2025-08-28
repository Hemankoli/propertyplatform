import React from "react";

export default function BookingCard({ data }) {
  return (
    <div
      key={data._id}
      className="border rounded-sm p-4 shadow-sm transition bg-white"
    >
      <img
        src={data.property.images?.[0]}
        alt={data.property.title || "Property"}
        className="w-full h-40 object-cover rounded-sm mb-1"
      />
      <h3 className="text-lg font-semibold">
        {data.property?.title || "Untitled Property"}
      </h3>

      <p className="text-gray-600">{data.property?.location?.address || "No location"}</p>

      <p className="text-sm text-gray-500 mt-2">
        📅 {new Date(data.startDate).toLocaleDateString()} →{" "}
        {new Date(data.endDate).toLocaleDateString()}
      </p>

      <p className="text-gray-800 font-bold mt-2">
        ₹{" "}
        {data.totalAmount >= 10000000
          ? `${(data.totalAmount / 10000000).toFixed(1)} Cr`
          : data.totalAmount >= 100000
          ? `${(data.totalAmount / 100000).toFixed(1)} Lakh`
          : data.totalAmount}
      </p>

      <span
        className={`inline-block px-3 py-1 mt-3 rounded-sm text-sm font-medium 
          ${
            data.status === "Booked"
              ? "bg-green-100 text-green-700 border border-green-700"
              : data.status === "Cancelled"
              ? "bg-yellow-100 text-yellow-700 border border-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
      >
        {data.status}
      </span>
    </div>
  );
}
