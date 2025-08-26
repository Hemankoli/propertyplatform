Property Listing & Booking Platform

A full-stack property marketplace built with Next.js, MongoDB/Mongoose, NextAuth, Razorpay, OpenLayers, and RBAC.
Users can browse, map, and book properties; Admins can manage users, properties, and bookings.

✨ Features

Auth: secure sessions, JWT.

RBAC: Admin and User roles (route & component-level guards).

Properties: CRUD for Admins (title, description, price, images, geolocation).

Map: OpenLayers map with markers for all properties + info popup.

Booking: Select date range → pay with Razorpay → booking saved to MongoDB.

Dashboards:

Admin: users, properties, bookings overview + management tables.

User: profile, my bookings, account settings.

Images: Pluggable uploader (Cloudinary).

API: RestFul API routes.

📦 Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express.js, API routes, Mongoose

Auth: JWT sessions

Payments: Razorpay (Orders API + signature verification)

Maps: OpenLayers

DB: MongoDB Atlas
