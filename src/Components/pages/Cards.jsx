import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./RotatingCube.jsx";
import CountUp from "react-countup";
import Aos from "aos";
import "aos/dist/aos.css";

const Cards = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      setState(res.data.products);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  const handleBuyNowClick = (product) => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("Please log in to add the product to cart.");
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Ensure product has a quantity field
      const newProduct = { ...product, quantity: 1 };
      cart.push(newProduct);
      
      localStorage.setItem("cart", JSON.stringify(cart));
      navigate("/cart", { state: { product } });
    }
  };

  const handleAddToCartClick = (product) => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("Please log in to add the product to cart.");
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Ensure product has a quantity field
      const newProduct = { ...product, quantity: 1 };
      cart.push(newProduct);
      
      localStorage.setItem("cart", JSON.stringify(cart));
      navigate("/cart", { state: { product } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10">
          {state.map((obj, index) => {
            const { title, description, price, images } = obj;
            return (
              <div
                data-aos="zoom-in-up"
                key={index}
                className="shadow-md rounded-xl bg-gray-50 h-[450px] flex flex-col justify-between items-center p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  className="h-[150px] w-[150px] object-contain"
                  src={images?.[0] || "https://via.placeholder.com/150"}
                  alt={title}
                />
                <h2 className="text-lg font-semibold text-gray-800 mt-4">
                  {title}
                </h2>
                <p className="text-sm text-gray-600">
                  {description.slice(0, 50)}...
                </p>
                <b className="text-xl text-gray-700">
                  $<CountUp end={price} duration={3} />
                </b>

                <button
                  data-aos="fade-up"
                  className="w-[80%] bg-gray-500 text-white font-bold rounded-full p-3 mt-4 hover:opacity-90 transition-opacity"
                  onClick={() => handleAddToCartClick({ title, images, description, price })}
                >
                  Add to Cart
                </button>

                <button
                  data-aos="fade-up"
                  className="w-[80%] bg-gray-700 text-white font-bold rounded-full p-3 mt-4 hover:opacity-90 transition-opacity"
                  onClick={() => handleBuyNowClick({ title, images, description, price })}
                >
                  BUY NOW
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cards;
