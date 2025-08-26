import React, { useState } from 'react';
import { useMainContext } from '../context';
import PropertyCard from '../components/cards/PropertyCard';
import FilterSection from '../components/FilterSection';

export default function PropertyPage() {
    const { properties } = useMainContext();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [location, setLocation] = useState('');

    const filteredProperties = properties?.filter(property => {
        const price = property.price || 0;
        const matchPrice = (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice));
        const matchLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());
        return matchPrice && matchLocation;
    });

    return (
        <section className='px-4 md:px-10 py-10 min-h-screen'>
            <button className='md:hidden block'>Filter</button>
            <div className='flex items-start border border-t-2 border-b-0 border-r-0 border-l-0'>
                <FilterSection 
                    props={{maxPrice, minPrice, location,setMinPrice, setMaxPrice, setLocation}}
                />

                <div className="w-[77%] grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 px-4">
                    {filteredProperties?.length > 0 ? (
                        filteredProperties.map(property => (
                            <PropertyCard key={property._id} property={property} />
                        ))
                    ) : (
                        <p className="col-span-full text-center mt-40 text-gray-500">
                            No properties found matching your filters.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
