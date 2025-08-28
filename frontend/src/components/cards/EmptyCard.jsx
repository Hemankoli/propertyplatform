import { FaSpinner } from 'react-icons/fa6'

export default function EmptyCard() {
  return (
    <div>
      <div className="bg-white rounded shadow overflow-hidden block transform transition-all duration-300 hover:shadow-xl hover:scale-105">
        <div className='relative h-48 md:h-60 w-full flex items-center justify-center cursor-pointer bg-slate-100 animate-pulse'>
            <FaSpinner className='w-full animate-spin' />
            <div className='absolute top-2 right-2'>
                <button className='cursor-pointer w-full h-full bg-slate-200 animate-pulse p-4 rounded-full'></button>
            </div>
        </div>
        <div className="p-4">
            <p className='text-md text-gray-800 line-clamp-2 bg-slate-200 animate-pulse px-2 py-2 mb-2 rounded-sm'></p>
            <p className='text-md text-gray-800 line-clamp-2 bg-slate-200 animate-pulse px-2 py-2 mb-2 rounded-sm'></p>
            <p className='text-md text-gray-800 line-clamp-2 bg-slate-200 animate-pulse px-2 py-2 mb-2 rounded-sm'></p>
        </div>
      </div>
    </div>
  );
}
