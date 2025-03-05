import React from "react";

const Profile = () => {
  // Retrieve user data from sessionStorage
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  // If no user data is found, show a placeholder or message
  if (!parsedUser) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-center text-lg font-semibold text-gray-600">
          No user data available. Please log in.
        </p>
      </div>
    );
  }

  const { name, email, role, avatar } = parsedUser;

  return (
    <div className="absolute right-5 top-20 bg-black text-gray-500 w-[350px] z-50 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-200">
      {/* User Avatar */}
      <div className="mb-4">
        <img
          className="rounded-full border-4 border-gray-300 shadow-md"
          height={100}
          width={100}
          src={avatar}
          alt="User Avatar"
        />
      </div>

      {/* User Info */}
      <div className="space-y-3 text-center">
        <p className="text-lg font-semibold">
          <span className="text-gray-500">Name:</span>{" "}
          <span className="font-medium">{name}</span>
        </p>
        <p className="text-lg font-semibold">
          <span className="text-gray-500">Email:</span>{" "}
          <span className="font-medium">{email}</span>
        </p>
        <p className="text-lg font-semibold">
          <span className="text-gray-500">Role:</span>{" "}
          <span className="font-medium capitalize">{role}</span>
        </p>
      </div>

      {/* Logout Button */}
      <div className="mt-6 w-full">
        <button
          onClick={() => {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("user");
            window.location.reload();
            alert("Logged out successfully");
          }}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
