import React, { useCallback, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import PropertyCard from '../components/cards/PropertyCard';
import { useMainContext } from '../context';
import { Link } from 'react-router-dom';
import PropertyMap from '../components/PropertyMap';

export default function Home() {
    const { properties } = useMainContext();
    const [searchProperties, setSearchProperties] = useState(properties || []);
    const [search, setSearch] = useState('');
    const [currentImg, setCurrentImg] = useState(0);

    const images = [
        "https://www.forbesglobalproperties.com/cdn-cgi/image/width=1280,height=1280,fit=scale-down,quality=60,gravity=auto,sharpen=1,metadata=none,format=auto,onerror=redirect/wp-content/uploads/elementor/thumbs/B98Le8d7M9k3DegpEFZhS0lI_F8U4XZVzHWxtmGgYekxX9nCAxh0ZjtE2u9zqepXEUrVLqfm8KeIGW6Gtyd4X9WVYXupVppyDcDNQ0BfDpzVZsC9SgpqixQqtojTHE_8sJ30queSTuhlQDfYxQeoUndzy7REQ-1142826-1749801913-r78m71ndugjf1nzgt1o44tz4nlp423qtt3msnmhog0.jpg",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://res.akamaized.net/domain/image/upload/t_web/c_fill,w_720,h_480/v1629867843/65A_Champion_St_Brighton_VIC_1_bunjuj.jpg"
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleSearch = useCallback(() => {
        if (!search.trim()) {
            setSearchProperties(properties);
            return;
        }
        const filtered = properties?.filter(property =>
            property?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
            property?.location?.address?.toLowerCase()?.includes(search?.toLowerCase())
        );
        setSearchProperties(filtered);
    }, [search, properties]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <section className="relative bg-cover bg-center h-[40vh] md:h-[80vh] flex items-center justify-center"
              style={{ backgroundImage: `url(${images[currentImg]})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white max-w-3xl px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Find Your Dream Property
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Explore houses, apartments, and commercial spaces tailored for you.
                    </p>

                    <div className="bg-white rounded flex items-center p-2 md:p-4 gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Search by location or property..."
                            className="flex-1 text-black px-4 py-2 rounded border focus:border-orange-500 outline-none border-2 border-orange-400"
                        />
                        <button onClick={handleSearch} className="bg-orange-600 text-white px-6 py-[13px] rounded hover:bg-orange-700">
                            <FaSearch />
                        </button>
                    </div>  
                </div>
            </section>

            <section className="py-12 px-6 md:px-20 bg-gray-100">
                <h2 className="text-3xl font-semibold mb-8 text-center">
                    Featured Properties 
                </h2>
                {searchProperties?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {searchProperties?.slice(0, 6)?.map((item) => (
                            <PropertyCard key={item?._id} property={item} />
                        ))}
                    </div>
                ) : (<p className='text-xl text-orange-600 font-semibold mb-8 text-center'>No properties found.</p>)}
                {searchProperties.length > 6 && 
                    <Link to={'/properties'} onClick={()=> window.scrollTo({top:0, behavior: "smooth"})}
                        className='flex items-center justify-center mt-10 font-[500] text-orange-600 hover:underline'>
                        Load More...
                    </Link>
                }
            </section>

            {/* Map */}
            <section className="py-16 px-6 md:px-20 bg-gray-100">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
                    Explore Locations on Map
                </h2>
                <div className="flex justify-center">
                    <div className="w-full md:w-4/5 h-[500px] rounded-sm border border-orange-600 overflow-hidden">
                        <PropertyMap properties={properties} />
                    </div>
                </div>
            </section>
        </div>

    )
}