import React from 'react'

export default function Button({children, type="button", onClick, className=""}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-[5px] px-[10px] rounded shadow transition duration-200 ease-in-out ${className}`}
        >
            {children}
        </button>
    )
}
