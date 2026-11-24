
import { Link, useNavigate } from "react-router-dom";

export default function Navbar () {
    const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("currentUser"));
function handleLogout() {
  localStorage.removeItem("currentUser");
  navigate("/login");
}
    return (
        <nav className="
        bg-[#0F766E] text-white px-5 py-3 flex justify-between">
<Link to="/">Pathly</Link>
 <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
        </nav>
    );
}