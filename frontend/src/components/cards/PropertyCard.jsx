import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function PropertyCard({ property }) {
  return (
    <div className="group">
      <Link
        to={`/properties/${property?._id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-white rounded shadow overflow-hidden block transform transition-all duration-300 hover:shadow-xl hover:scale-105"
      >
        <div className="relative overflow-hidden h-56">
          <img
            src={property?.images[0]}
            alt="Property"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold group-hover:text-orange-600 transition-colors">
            {property?.title}
          </h3>
          <p className="text-gray-600">{property?.location?.address}</p>
          <p className="text-orange-600 font-bold mt-2 text-lg">
            ₹ {formatPrice(property?.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
