import React from 'react'

export default function NavButton({ method, label }) {
    return (
        <button
            onClick={method}
            className="px-3 py-1 bg-orange-600 text-white rounded-sm shadow hover:bg-orange-700 transition"
        >
            {label}
        </button>
    )
}