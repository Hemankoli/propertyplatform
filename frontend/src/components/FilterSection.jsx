import React from 'react'
import InputField from './helpers/InputField';

export default function FilterSection({props}) {
    const {maxPrice, minPrice, location,setMinPrice, setMaxPrice, setLocation} = props;
    return (
        <div className='w-[23%] bg-white p-4 border-r'>
            <h2 className='text-xl font-semibold mb-4'>Filter</h2>
            <div className='space-y-4'>
                <InputField
                    labelName={'Min Price'}
                    type="number"
                    value={minPrice}
                    method={(e) => setMinPrice(e.target.value)}
                    placeholder="e.g. 100000"
                />
                <InputField
                    labelName={'Max Price'}
                    type="number"
                    value={maxPrice}
                    method={(e) => setMaxPrice(e.target.value)}
                    placeholder="e.g. 500000"
                />
                <InputField
                    labelName={'Location'}
                    type="text"
                    value={location}
                    method={(e) => setLocation(e.target.value)}
                    placeholder={"Search Location"}
                />
            </div>
        </div>
    )
}
