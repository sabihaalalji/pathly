
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <nav className="bg-[#042F2E] text-white px-5 py-4 flex justify-between items-center">
      <Link to="/" className="text-large font-medium text-[#FB7185]">
        Pathly
      </Link>
      <div>
        <Link
          to="/login"
          className="border border-white/45 rounded-full px-4 py-1.5"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-[#FB7185] text-[#042F2E] rounded-full px-4 py-1.5 font-medium ml-2"
        >
          Register
        </Link>
        <Link
          to="/bookmarks"
          className="border border-white/45 rounded-full px-4 py-1.5 ml-2"
        >
          Bookmarks
        </Link>
        <Link 
        to="/my-applications"
        className="border border-white/45 rounded-full px-4 py-1.5 ml-2">
          My Applications
        </Link>
      </div>
    </nav>
  );
}

