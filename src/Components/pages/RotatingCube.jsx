import React from "react";
import "./RotatingCube.css"; // Import custom styles

const RotatingCube = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text mb-6">
        First Collection Luxury Pvt. Ltd.
      </h1>

      <div className="cube-container">
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>

      <p className="mt-6 text-lg text-gray-300 animate-pulse">
        Crafting your luxury experience...
      </p>
    </div>
  );
};

export default RotatingCube;
