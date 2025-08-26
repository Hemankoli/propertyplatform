import { HiOutlineTrash } from 'react-icons/hi';
import { FiUpload } from 'react-icons/fi';

export const ImageUploader = ({ imagePreview, onImageChange, onRemoveImage }) => {

    return (
        <div className='space-y-2'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Images</label>
            <div className="mt-1 flex flex-col justify-center border-2 border-gray-300 border-dashed rounded-md">
                <div className="flex flex-col items-center justify-center">
                    <FiUpload className="mx-auto h-12 w-10 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                            <span>Upload an image</span>
                            <input
                                type="file"
                                className="sr-only"
                                onChange={onImageChange}
                                accept="image/*"
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
            </div>
            <div className="space-y-1 text-center">
                    {imagePreview?.length > 0 && (
                        <div className="flex items-center flex-wrap gap-4 w-full">
                            {imagePreview?.map((image, idx) => (
                                <div key={idx} className='relative w-12 h-12'>
                                    <img className="h-full w-full object-cover"
                                        src={typeof image === 'string' ? image : URL?.createObjectURL(image)}
                                        alt="Uploaded Preview"
                                    />
                                    <button type="button" onClick={() => onRemoveImage(idx)} className='absolute top-0 right-0 text-[10px] md:text-[16px] text-red-500'>
                                        <HiOutlineTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        </div>
    )
}