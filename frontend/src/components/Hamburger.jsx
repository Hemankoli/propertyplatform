import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import NavButton from "./helpers/NavButton";

export default function Hamburger({ setModal, user, handleLogout }) {
    function closeMenu() {
        setModal(null);
        window.scrollTo({top:0, behavior:"smooth"})
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

                <div className="md:hidden flex flex-col items-start space-y-6 pt-20">
                    {user && user?.user?.role === "Admin" &&
                        <Link to={"/dashboard/admin"} onClick={closeMenu} className="text-orange-600 font-semibold hover:text-orange-500">
                            Admin Dashboard
                        </Link>}
                    {user ? (
                        <>
                            <Link to={"/dashboard/account"} onClick={closeMenu}  className="text-orange-600 font-semibold hover:text-orange-500">
                                Account
                            </Link>
                            <NavButton
                                method={handleLogout}
                                label="Log Out"
                            />
                        </>
                    ) : (
                        <>
                            <button onClick={() => setModal('login-modal')} className="text-orange-600 font-semibold hover:text-orange-500">
                                Log In
                            </button>
                            <NavButton
                                method={() => setModal("signup-modal")}
                                label="Sign Up"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}