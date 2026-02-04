import React from "react";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <button
      className="bg-teal-400 text-teal-950 px-4 py-2 rounded-lg border border-teal-200 hover:bg-teal-300 hover:shadow-lg transition-all"
      onClick={handleLogout}
    >
      <FiLogOut size={18} className="flex md:hidden" />
      <span className="hidden md:block">Logout</span>
    </button>
  );
};

export default Logout;
