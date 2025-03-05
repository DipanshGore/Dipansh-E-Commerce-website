import Navbar from "./Components/pages/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chip from "./Components/Collection/Chip";
import Men from "./Components/Collection/Men";
import Women from "./Components/Collection/Women";
import Jewellery from "./Components/Collection/Jewellery";
import Footer from "./Components/pages/Footer";
import Electronics from "./Components/Collection/Electronics";
import Login from "./Components/Auth/Login";
import Cart from "./Components/pages/Cart";
import Checkout from "./Components/pages/Checkout";
import Register from "./Components/Auth/Register";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Chip />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}