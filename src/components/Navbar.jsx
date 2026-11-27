import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-[#042F2E] text-white px-5 py-4 flex justify-between items-center">
      <Link to="/" className="text-large font-large text-[#FB7185]">
        Pathly
      </Link>
      <div>
        {!user && (
          <>
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
          </>
        )}

        <Link
          to="/bookmarks"
          className="border border-white/45 rounded-full px-4 py-1.5 ml-2"
        >
          Bookmarks
        </Link>
        <Link
          to="/my-applications"
          className="border border-white/45 rounded-full px-4 py-1.5 ml-2"
        >
          My Applications
        </Link>

        {user && (
          <button
            onClick={handleLogout}
            className="bg-[#FB7185] text-[#042F2E] rounded-full px-4 py-1.5 font-medium ml-2"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}