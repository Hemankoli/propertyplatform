import React, { useState } from 'react';
import { useMainContext } from '../context';
import { PropertyCard, FilterSection, Pagination, EmptyCard } from '../components';

export default function PropertyPage() {
    const { properties, isPropertyBooked } = useMainContext();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [location, setLocation] = useState('');
    const [page, setPage] = useState(1);

    const filteredProperties = properties?.filter(property => {
        const price = property.price || 0;
        const matchPrice = (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice));
        const matchLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());
        return matchPrice && matchLocation;
    });

    const itemsPerPage = 12;
    const totalPages = Math.ceil(filteredProperties?.length / itemsPerPage);
    const currentPageProperties = filteredProperties?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <section className='max-w-[1400px] mx-auto px-4 md:px-10 py-10 min-h-screen'>
            <button className='md:hidden block'>Filter</button>
            <div className='flex items-start border border-t-2 border-b-0 border-r-0 border-l-0 pb-10'>
                <FilterSection 
                    props={{maxPrice, minPrice, location,setMinPrice, setMaxPrice, setLocation}}
                />

                <div className="w-[77%] grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 px-4">
                    {currentPageProperties?.length > 0 ? (
                        currentPageProperties.map(property => {
                            const booked = isPropertyBooked(property?._id);
                            return (
                                <div key={property._id} className="relative">
                                    <PropertyCard property={property} booked={booked} />
                                </div>
                            );
                        })
                    ) : (
                        [1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                            <EmptyCard key={i} />
                        ))
                    )}
                </div>
            </div>
            {filteredProperties?.length > itemsPerPage && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            )}
        </section>
    );
}
