import { useMainContext } from '../../context';
import { deleteProperty } from '../../services/apis';
import { PropertyDeletedSuccessfullyNotification } from '../notifications/notification';

export default function ConfirmationModal() {
    const {loader, setLoader, selectedIds, onClose} = useMainContext();

    const handleDelete = async () => {
        setLoader(true);
        try {
            await deleteProperty(selectedIds);
            await onClose();
            PropertyDeletedSuccessfullyNotification();
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 max-w-md w-[90%] md:w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-10 items-center space-x-3">
                    <button
                        onClick={onClose}
                        disabled={loader}
                        className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loader}
                        className={`px-4 py-2 rounded text-sm font-medium text-white focus:outline-none ${loader ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        {loader ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};