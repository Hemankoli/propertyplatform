import React from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { useMainContext } from '../context';

export default function DataTable({ label, buttonLabel, columns, rows }) {
  const { setModal } = useMainContext();

  return rows?.length > 0 ? (
    <div className="mt-10 bg-white shadow rounded p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{label}</h2>
        {label === "Properties" && (
          <button
            onClick={() => setModal("create-property-modal")}
            className="bg-orange-500 rounded-sm text-white px-4 py-2"
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="mt-10 bg-white shadow rounded overflow-x-auto max-h-[650px] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              {columns?.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {columns.map((col, colIdx) => {
                  const value = row[col];
                  const isImage = col.toLowerCase().includes("image") || col.toLowerCase().includes("photo");
                  return (
                    <td key={colIdx} className="p-3">
                      {isImage && value ? (
                        Array.isArray(value) ? (
                          <div className="flex gap-2">
                            {value.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="preview"
                                className="w-12 h-12 object-cover rounded"
                              />
                            ))}
                          </div>
                        ) : (
                          <img
                            src={value}
                            alt="preview"
                            className="w-12 h-12 object-cover rounded"
                          />
                        )
                      ) : (
                        value || "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-10">
      <BsBoxSeam className="text-4xl text-gray-300 mb-2" />
      <p>No Data found</p>
      <p className="text-xs mt-1">Try adjusting your search or filters</p>
    </div>
  );
}
