export default function InputField({labelName, type='text', name, value, placeholder, method, className=''}) {
    return (
        <div className='space-y-2'>
            <label className='className="block text-gray-700 text-md font-bold mb-2"'>{labelName}</label>
            <input 
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={method}
                className={`text-[13px] italic border border-gray-800 focus:border-orange-600 outline-none w-full rounded-md py-2 px-4 text-[#0000009C] bg-white ${className}`}
            />
        </div>
    )
}
