import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, [cartCount]);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      // Trigger welcome message only once after login
      if (!sessionStorage.getItem("welcomeMessageShown")) {
        triggerMessage("Welcome to a world where luxury is redefined and crafted exclusively for those who seek the extraordinary. Experience a journey like never before!");
        sessionStorage.setItem("welcomeMessageShown", "true");
      }
    }
  }, []);

  const triggerMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 12000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("welcomeMessageShown"); // Reset for next login
    setUser(null);
    triggerMessage("Thank you for being a part of the First Collection Luxury experience – where every moment is crafted to perfection. We look forward to welcoming you again soon!");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 12000);
  };

  const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      alert("Please login to access the cart");
      navigate("/login");
    }
  };

  const hiddenPaths = ["/address", "/addnewaddress", "/updateaddress", "/ordered"];
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <>
      <header className="flex justify-between items-center h-[75px] bg-gray-900 text-gray-200 shadow-md px-4">
        <div className="font-bold text-3xl relative group">
          <NavLink to="/" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            <b>First Collection</b>
          </NavLink>
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:scale-x-110"></span>
        </div>

        <div className="w-[45%]">
          <ul className="flex justify-between text-lg font-medium">
            {["men", "women", "electronics", "jewellery"].map((category) => (
              <NavLink
                key={category}
                to={category}
                className={({ isActive }) => (isActive ? "text-white" : "text-gray-400")}
              >
                <li className="relative group">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span
                    className={`absolute bottom-[-4px] left-0 w-0 h-[3px] ${
                      category === "men"
                        ? "bg-gradient-to-r from-orange-100 via-orange-300 to-orange-500 text-transparent"
                        : category === "women"
                        ? "bg-gradient-to-r from-pink-100 via-pink-300 to-pink-500 text-transparent"
                        : category === "electronics"
                        ? "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text-transparent"
                        : "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 text-transparent"
                    } group-hover:w-full transition-all duration-300`}></span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer" onClick={handleCartClick}>
          <PiShoppingCartLight size={35} />
          {cartCount > 0 && (
            <span className="absolute top-[-11px] left-[10px] bg-blue-600 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-8">
              <span className="text-white">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all">
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-all">
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      </header>

      {/* Animated Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold z-50"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
