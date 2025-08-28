import { useMainContext } from "../context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { AnimatePresence, motion } from "framer-motion";
import { Hamburger, NavButton } from "../components";

export default function Header() {
  const { user, modal, setModal, setUser } = useMainContext();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between py-3 px-4 md:px-10">
       <Link to="/"
          className="flex items-center text-2xl md:text-3xl font-bold cursor-pointer"
        > 
          <img className="w-[40px] h-[40px]" 
            src="https://cdn.dreampropertiesvalencia.com/2021/07/Favicon.png"  alt="logo"
          />
          <p className="bg-orange-600 bg-clip-text text-transparent drop-shadow-sm transition-transform duration-300">
            Estatly
          </p>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-medium">
          {user ? (
            <>
              <Link
                to="/dashboard/account"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Account
              </Link>
              {user?.user?.role === "Admin" && (
                <Link
                  to="/dashboard/admin"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-3 py-1 bg-orange-600 text-white rounded-sm shadow hover:bg-orange-700 transition"
                >
                  Admin Dashboard
                </Link>
              )}
              <NavButton
                method={() => {
                  handleLogout();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                label="Log Out"
              />
            </>
          ) : (
            <>
              <button
                onClick={() => setModal("login-modal")}
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Log In
              </button>
              <NavButton
                method={() => setModal("signup-modal")}
                label="Sign Up"
              />
            </>
          )}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setModal("toggle-menu")}
            className="p-2 rounded-lg hover:bg-orange-50 transition"
          >
            <TfiMenu size={22} className="text-gray-700" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modal === "toggle-menu" && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 max-w-sm h-full z-40"
          >
            <Hamburger
              modal={modal}
              setModal={setModal}
              user={user}
              handleLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
