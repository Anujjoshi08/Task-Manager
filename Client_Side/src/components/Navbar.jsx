import { useEffect, useState } from "react";
import Logo from "../ui/Logo";
import Logout from "../ui/Logout";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [name, setName] = useState("User");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;
        const data = await res.json();
        if (data?.name) setName(data.name);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    // eslint-disable-next-line
    <nav className="flex py-4 px-4 bg-linear-to-r from-teal-800 to-teal-900 border-b border-teal-700 items-center justify-between shadow-lg">
      <div className="flex gap-2 items-center">
        <Logo />
        <h1 className="text-xl font-semibold md:text-2xl text-white">
          Dashboard
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <h2 className="hidden md:block font-semibold text-xl text-white">
          Welcome, {name}
        </h2>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `md:hidden p-2 rounded ${isActive ? "bg-white text-teal-800" : "text-white hover:bg-teal-700"}`
          }
        >
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;
