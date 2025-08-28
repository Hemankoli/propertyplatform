import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded-sm font-medium transition-all duration-200 
          ${page === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"}`}
            >
                Previous
            </button>
            <span className="text-gray-700 font-semibold">
                <span className="text-indigo-600 border border-indigo-500 px-3 py-1 rounded-sm">{page}</span>
            </span>
            <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-sm font-medium transition-all duration-200 
                ${page === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"}`}
            >
                Next
            </button>
        </div>
    );
}
