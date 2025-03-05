import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const Electronics = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Filter electronics products
        const ElectronicsProducts = data.filter(
          (product) => product.category === "electronics"
        );
        setState(ElectronicsProducts);
        setLoading(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center py-10 text-gray-800">
        Electronics Market
      </h1>
      <div className="flex flex-wrap justify-center gap-8 px-5">
        {loading ? (
          state.map(({ title, image, description, price }, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 w-[320px] h-[500px] flex flex-col items-center border border-gray-300 hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <h2 className="font-semibold text-lg text-gray-800 mb-3 text-center">
                {title.length > 20 ? title.slice(0, 20) + "..." : title}
              </h2>
              <img
                src={image}
                alt={title}
                className="w-[200px] h-[200px] object-contain mb-4 rounded-md"
              />
              <p className="text-gray-600 text-sm mb-3 text-center">
                {description.slice(0, 50)}...
              </p>
              <b className="text-xl text-gray-700 mb-4">
                $<CountUp end={price} duration={5} />
              </b>
              <button
                data-aos="fade-up"
                className="w-[200px] bg-gray-500 text-white font-bold rounded-lg py-2 hover:bg-gray-700 transition-colors mb-2"
                onClick={() =>
                  handleAddToCartClick({ title, image, description, price })
                }
              >
                Add to Cart
              </button>

              <button
                data-aos="fade-up"
                className="w-[200px] bg-gray-700 text-white font-bold rounded-lg py-2 hover:bg-gray-800 transition-colors"
                onClick={() =>
                  handleBuyNowClick({ title, image, description, price })
                }
              >
                BUY NOW
              </button>
            </div>
          ))
        ) : (
          // Show skeleton loaders while loading
          Array.from(new Array(6)).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 w-[320px] h-[500px] flex flex-col items-center border border-gray-300"
            >
              <Skeleton variant="text" width={200} height={30} />
              <Skeleton
                variant="rectangular"
                width={200}
                height={200}
                className="my-4"
              />
              <Skeleton variant="text" width={250} />
              <Skeleton
                variant="rectangular"
                width={200}
                height={40}
                className="mt-4"
              />
            </div>
          ))
        )}
      </div>
      <div className="py-10"></div>
    </div>
  );
};

export default Electronics;
