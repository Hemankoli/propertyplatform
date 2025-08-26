import React from 'react'

export default function Footer() {
    return (
        <div className="bg-orange-300 py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Property Seller. All rights reserved.</p>
            </div>
        </div>
    )
}
