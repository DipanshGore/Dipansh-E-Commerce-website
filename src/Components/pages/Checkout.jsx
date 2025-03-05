import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTruck } from "react-icons/fa"; 

const Checkout = () => {
    const location = useLocation();
    const state = location.state?.products || [];
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [showMessage, setShowMessage] = useState(false);

    const handleOrderConfirm = (e) => {
        e.preventDefault();
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 10000);
    };

    const EmptyCart = () => (
        <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
            <h4 className="text-2xl font-semibold text-gray-500">Your cart is empty!</h4>
            <Link to="/" className="px-6 py-3 bg-gray-900 text-white text-lg rounded-md hover:bg-gray-800 transition">
                <i className="fa fa-arrow-left mr-2"></i> Continue Shopping
            </Link>
        </div>
    );

    const ShowCheckout = () => {
        let subtotal = state.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let shipping = subtotal > 100 ? 0 : 30.0;
        let totalItems = state.reduce((acc, item) => acc + item.quantity, 0);

        return (
            <div className="container mx-auto py-10 px-6">
                 {showMessage && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-bounce">
                            <h2 className="text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Your Order Placed Successfully!</h2>
                            <p className="text-gray-700 mt-2"><b>Luxury is not a choice, it's a lifestyle.</b><p className="text-4xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">First Collection Luxury Pvt. Ltd.</p></p>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-1 bg-white shadow-lg rounded-lg p-6 border">
                        <h5 className="text-2xl font-bold border-b pb-4 mb-4 text-gray-800">Order Summary</h5>
                        <ul className="space-y-4">
                            {state.map((item) => (
                                <li key={item.id} className="flex items-center gap-4 border-b pb-3">
                                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h6 className="text-lg font-semibold text-gray-700">{item.title}</h6>
                                        <p className="text-gray-500">Qty: <span className="font-semibold">{item.quantity}</span></p>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>

                        <ul className="mt-6 space-y-3 text-lg font-medium">
                            <li className="flex justify-between text-gray-700">
                                Products ({totalItems}) <span className="font-bold">${subtotal.toFixed(2)}</span>
                            </li>
                            <li className="flex justify-between text-gray-700">
                                Shipping <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                            </li>
                            <li className="flex justify-between text-xl font-bold border-t pt-3">
                                Total <span>${(subtotal + shipping).toFixed(2)}</span>
                            </li>
                        </ul>

                        {/* Delivery Message with Truck Icon */}
                        <div className="flex items-center gap-14 text-green-600 mt-4 text-lg font-medium">
                            <FaTruck className="text-2xl" />
                            <span>Tomorrow your order will be delivered!</span>
                        </div>
                    </div>

                    {/* Billing & Payment Form */}
                    <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6 border">
                        <h4 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">Billing Details</h4>
                        <form className="space-y-6" onSubmit={handleOrderConfirm}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                                    <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="Enter your full name" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="Enter your email" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="Enter your address" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Zip Code</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="Enter zip code" required />
                            </div>
                            <hr className="my-6" />

                            {/* Payment Details */}
                            <h4 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">Payment Details</h4>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200">
                                    <option value="card">Credit/Debit Card</option>
                                    <option value="upi">UPI</option>
                                    <option value="netbanking">Net Banking</option>
                                    <option value="wallets">Wallets</option>
                                    <option value="cod">Cash on Delivery</option>
                                </select>
                            </div>
                            {paymentMethod === "card" && (
                                <>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                                        <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="Enter card number" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                                            <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="MM/YY" required />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                                            <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="CVV" required />
                                        </div>
                                    </div>
                                </>
                            )}
                            {paymentMethod === "upi" && (
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">UPI ID</label>
                                    <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200" placeholder="Enter UPI ID" required />
                                </div>
                            )}
                            <button className="w-full mt-6 px-6 py-3 bg-green-600 text-white text-lg rounded-md hover:bg-green-500 transition" type="submit">Confirm Order</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    return state.length ? <ShowCheckout /> : <EmptyCart />;
};

export default Checkout;
