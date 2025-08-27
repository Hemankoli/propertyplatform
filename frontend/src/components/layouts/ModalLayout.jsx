import { useMainContext } from "../../context";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalLayout({ children }) {
  const { onClose } = useMainContext();

  async function clicked(e) {
    if (e.target === e.currentTarget) {
      await onClose();
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        onClick={clicked}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end md:items-center p-4 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-[500px] mx-auto bg-white rounded-sm shadow-2xl max-h-[90%] overflow-y-auto"
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-3">
            <div className="flex justify-end items-center">
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-black transition"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
          <div className="px-7 py-5">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
