export default function TotalsData({ label, count }) {
    return (
        <div>
            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-xl font-semibold text-gray-700">{label}</h2>
                <p className="mt-2 text-3xl font-bold text-indigo-600">{count}</p>
            </div>
        </div>
    )
}
