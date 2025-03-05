import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const handleRemoveFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (index, amount) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + amount);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleProceedToCheckout = () => {
        if (cartItems.length === 0) return;
        navigate("/checkout", { state: { products: cartItems } });
    };

    const handleClearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cartItems.map((item, index) => (
                            <div key={index} className="shadow-lg rounded-xl bg-white p-6 flex flex-col items-center transform transition hover:scale-105 duration-300">
                                <img src={item.images?.[0] || ""} alt={item.title} className="h-[150px] w-[150px] object-contain mb-4" />
                                <h2 className="text-lg font-semibold text-gray-800 text-center">{item.title}</h2>
                                <p className="text-sm text-gray-600 text-center">{item.description.slice(0, 50)}...</p>
                                <b className="text-xl text-gray-700 mt-2">${item.price}</b>
                                <div className="flex items-center gap-4 mt-3">
                                    <button onClick={() => handleQuantityChange(index, -1)} className="px-3 py-1 bg-gray-300 rounded-full">➖</button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(index, +1)} className="px-3 py-1 bg-gray-300 rounded-full">➕</button>
                                </div>
                                <button className="w-[80%] bg-red-500 text-white font-bold rounded-full p-3 mt-4 hover:bg-red-600 transition" onClick={() => handleRemoveFromCart(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</h2>
                        <button className="bg-green-500 text-white font-bold rounded-full px-6 py-3 mt-4 hover:bg-green-600 transition" onClick={handleProceedToCheckout}>
                            Proceed to Checkout
                        </button>
                        <button className="bg-gray-500 text-white font-bold rounded-full px-6 py-3 mt-4 ml-4 hover:bg-gray-600 transition" onClick={handleClearCart}>
                            Clear Cart
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 text-center text-lg">Your cart is empty. Start adding items!</p>
            )}
        </div>
    );
};

export default Cart;
