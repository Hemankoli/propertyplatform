import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function Hambuerger({ setModal, user, handleLogout }) {
    function closeMenu() {
        setModal(null);
    }
    return (
        <div className="fixed inset-0 bg-black/40 z-40 flex justify-end">
            <div className="w-64 bg-white h-full shadow-lg p-6 animate-slide-in">
                <button
                    onClick={() => setModal(null)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                >
                    <IoClose size={24} />
                </button>

                <div className="md:hidden flex flex-col items-start space-y-4 pt-10">
                    {user && user?.user?.role === "Admin" &&
                        <Link to={"/dashboard/admin"} onClick={closeMenu} className="text-orange-600 font-semibold hover:text-orange-500">
                            Admin Dashboard
                        </Link>}
                    {user ? (
                        <>
                            <Link to={"/dashboard/account"} onClick={closeMenu}  className="text-orange-600 font-semibold hover:text-orange-500">
                                Account
                            </Link>
                            <button onClick={() => { handleLogout(); closeMenu(); }} className="font-semibold hover:text-gray-800">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setModal('login-modal')} className="text-orange-600 font-semibold hover:text-orange-500">
                                Log In
                            </button>
                            <button onClick={() => setModal('signup-modal')} className="font-semibold">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}