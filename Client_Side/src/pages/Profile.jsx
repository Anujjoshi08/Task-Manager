import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios.put(
      `${import.meta.env.VITE_API_URL}/profile`,
      { name, email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Profile updated");
  };

  return (
    // eslint-disable-next-line
    <div className="bg-linear-to-br from-slate-50 to-slate-100 min-h-screen items-center justify-center flex">
      <div className="max-w-md mx-auto pt-10 p-6 border border-slate-200 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Profile</h2>

        <form onSubmit={handleUpdate}>
          <label className="text-slate-700 font-semibold">Name</label>
          <input
            className="w-full border border-slate-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="text-slate-700 font-semibold">Email</label>
          <input
            className="w-full border border-slate-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* eslint-disable-next-line */}
          <button className="bg-linear-to-r from-teal-800 to-teal-900 text-white px-4 py-2 rounded-lg font-semibold w-full hover:shadow-lg transition-all">
            Update Profile
          </button>
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 text-teal-800 hover:text-teal-900 font-semibold underline w-full cursor-pointer transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
