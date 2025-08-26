import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import PropertyCard from '../components/cards/PropertyCard';
import { useMainContext } from '../context';
import { Link } from 'react-router-dom';
import PropertyMap from '../components/PropertyMap';

export default function Home() {
    const { properties } = useMainContext();
    const [searchProperties, setSearchProperties] = useState(properties || []);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!search.trim()) {
            setSearchProperties(properties);
            return;
        }
        const filtered = properties.filter(property =>
            property.title.toLowerCase().includes(search?.toLowerCase()) ||
            property.location.address.toLowerCase().includes(search?.toLowerCase())
        );
        setSearchProperties(filtered);
    }, [search, properties]);

    function handleSearch () {
        if (!search.trim()) {
            setSearchProperties(properties);
            return;
        }
        const filtered = properties.filter(property =>
            property.title.toLowerCase().includes(search?.toLowerCase()) ||
            property.location.address.toLowerCase().includes(search?.toLowerCase())
        );
        setSearchProperties(filtered);
    }

    return (
        <div className="w-full min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="relative bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center h-[80vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-orange-500/30"></div>
                <div className="relative z-10 text-center text-white max-w-4xl px-6 animate-fadeIn">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                        Find Your Dream Property
                    </h1>
                    <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                        Explore houses, apartments, and commercial spaces tailored for you.
                    </p>

                    <div className="bg-white rounded-full shadow-xl flex items-center p-2 md:p-3 gap-2 transition-transform transform hover:scale-105">
                        <input
                            type="text"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Search by location or property..."
                            className="flex-1 text-gray-800 px-4 py-2 rounded-full border focus:border-orange-500 outline-none border-gray-300"
                        />
                        <button onClick={handleSearch} className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition">
                            <FaSearch />
                        </button>
                    </div>  
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 px-6 md:px-20 bg-gray-100">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                    Explore Locations on Map
                </h2>
                <div className="flex justify-center">
                    <div className="w-full md:w-4/5 h-[500px] rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
                        <PropertyMap properties={properties} />
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="py-16 px-6 md:px-20 bg-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
                    Featured Properties
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {searchProperties?.slice(0, 6)?.map((item) => (
                        <PropertyCard key={item._id} property={item} />
                    ))}
                </div>
                {searchProperties.length > 6 && 
                    <Link 
                        to={'/properties'} 
                        onClick={()=> window.scrollTo({top:0, behavior: "smooth"})}
                        className='flex items-center justify-center mt-12 font-medium text-orange-600 hover:text-orange-700 hover:underline transition'
                    >
                        Load More...
                    </Link>
                }
            </section>
        </div>
    )
}
