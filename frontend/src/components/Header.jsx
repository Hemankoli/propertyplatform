import { useMainContext } from "../context";
import axios from "axios";
import { Link } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import Hambuerger from "./Hambuerger";

export default function Header() {
    const { user, modal, setModal, setUser } = useMainContext();

    async function handleLogout() {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    return (
        <header className="bg-white shadow-md sticky top-0 z-30">
            <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-10">
                <Link to={"/"} className="flex items-center text-2xl md:text-3xl font-bold text-white cursor-pointer">
                    <p className="text-orange-600">Property</p><span className="text-gray-900 italic">Seller</span>
                </Link>
                {/* Destok Menu */}
                <div className="hidden md:flex space-x-4">
                    {user && user?.user?.role === "Admin" && 
                    <Link to={"/dashboard/admin"} className="text-orange-600 font-semibold hover:text-orange-500">
                        Admin Dashboard
                    </Link>}
                    {user ? (
                        <>
                            <Link to={"/dashboard/account"} className="text-orange-600 font-semibold hover:text-orange-500">
                                Account
                            </Link>
                            <button onClick={handleLogout} className="font-semibold hover:text-gray-800">
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
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button onClick={() => setModal("toggle-menu")}>
                        <TfiMenu size={20}/>
                    </button>
                </div>
                {modal === "toggle-menu" && 
                    <Hambuerger modal={modal} setModal={setModal} user={user} handleLogout={handleLogout} />
                }
            </div>
        </header>
  );
}
