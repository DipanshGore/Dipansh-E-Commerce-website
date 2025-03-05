import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  // Exclude the footer from specific paths
  const hiddenPaths = [
    "/address",
    "/addnewaddress",
    "/updateaddress",
    "/login",
    "/ordered",
    "/men",
    "/women",
    "/electronics",
    "/jewellery",
    "/register",
  ];
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="h-[80px] flex items-center justify-center text-gray-200 bg-gray-900 border-t border-gray-700">
      <div className="text-center text-sm">
        <p className="mb-1 font-semibold tracking-wide">
          © 2025 First Collection Luxury Pvt. Ltd.
        </p>
        <p className="text-gray-400">
          All Rights Reserved | Designed with{" "}
          <span className="text-red-500 font-bold">❤</span> By Dipansh Gore
        </p>
      </div>
    </footer>
  );
};

export default Footer;
