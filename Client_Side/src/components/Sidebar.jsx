import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    // eslint-disable-next-line
    <div className="hidden md:flex flex-1 flex-col gap-4 bg-linear-to-b from-teal-800 to-teal-900 text-white px-2 py-8 font-semibold text-xl shadow-lg">
      <div className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `p-2 rounded transition-all ${isActive ? "bg-white text-teal-800" : "hover:bg-teal-700"}`
          }
        >
          <FontAwesomeIcon icon={faListCheck} />
          <span className="ml-3">Tasks</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `p-2 rounded transition-all ${isActive ? "bg-white text-teal-800" : "hover:bg-teal-700"}`
          }
        >
          <FontAwesomeIcon icon={faUser} />
          <span className="ml-3">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
