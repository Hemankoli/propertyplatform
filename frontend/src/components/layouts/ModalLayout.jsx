import { useMainContext } from "../../context";
import { FiX } from "react-icons/fi";

export const ModalLayout = ({children}) => {
    const { onClose } = useMainContext();

    async function clicked(e) {
        if (e.target === e.currentTarget) {
            await onClose();
        }
    }

    return (  
        <div onClick={clicked} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end md:items-center p-4 z-40">
            <div className="w-full max-w-[500px] mx-auto bg-white rounded shadow-lg max-h-[90%] overflow-y-auto">
                <div className="p-3 text-white">
                    <div className="flex justify-end items-center">
                        <button onClick={onClose} className="text-black">
                            <FiX size={20} />
                        </button>
                    </div>
                </div>
                <div className="px-7 py-5">{children}</div>
            </div>
        </div>
    );
};
