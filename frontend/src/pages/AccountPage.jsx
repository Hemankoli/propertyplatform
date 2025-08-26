import { useMainContext } from "../context";

export const AccountPage = () => {
  const { user, bookings } = useMainContext();

  console.log(user)

  return (
    <div className="min-h-screen md:px-10 px-4 py-10">
      <div className="flex flex-col md:flex-row items-start w-full gap-4">
        <div className="md:w-1/3 w-full mx-auto flex items-center md:items-start p-4 flex-col mx-auto border border-orange-300 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Account Information</h2>
          {user ? (
            <div className="flex items-center md:items-start flex-col gap-4">
              <div className="w-20 h-20">
                <img src="https://www.consoledot.com/assets/images/team/team-2.webp" alt="Profile" 
                  className="w-full h-full rounded-full" 
                />
              </div>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Name:</span> {user?.user?.name}</p>
                <p><span className="font-semibold">Email:</span> {user?.user?.email}</p>
              </div>
            </div> 
          ) : (
            <p className="text-gray-500">Loading user info...</p>
          )}
        </div>
        <div className="md:w-2/3 w-full flex items-center md:items-start p-4 flex-col mx-auto border border-orange-300 shadow-md max-h-[600px] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
          {bookings?.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {bookings.map((property) => (
                <div
                  key={property._id}
                  className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition bg-gray-50"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-gray-800 font-bold mt-2">
                    ₹ {property.price >= 10000000
                      ? `${(property.price / 10000000).toFixed(1)} Cr`
                      : property.price >= 100000
                      ? `${(property.price / 100000).toFixed(1)} Lakh`
                      : property.price}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};