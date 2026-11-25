import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const inputClass = "mt-4 w-full rounded-xl bg-white/10 border border-white/30 px-4 py-3 text-sm text-[#F0FDFA] placeholder:text-[#99F6E4]/70 outline-none focus:border-[#FB7185]";

  return (
    <div className="min-h-[80vh] bg-[#042F2E] flex items-center justify-center px-5 py-10">
      <form className="w-full max-w-md rounded-3xl bg-white/10 border border-white/25 p-6 text-[#F0FDFA]">
        <h2 className="text-2xl font-medium">Welcome back!</h2>
        <p className="mt-1 text-sm text-[#CCFBF1]">Log in to find more opportunities and track your applications.</p>

        <input className={inputClass} type="email" name="email" placeholder="Email" />
        <input className={inputClass} type="password" name="password" placeholder="Password" />

        <button className="mt-6 w-full rounded-xl bg-[#FB7185] py-3 text-base font-medium text-[#042F2E]" type="submit">
          Log in
        </button>

        <p className="mt-5 text-center text-sm text-[#CCFBF1]">
          New here? <Link to="/register" className="font-medium text-[#FB7185]">Create an account</Link>
        </p>
      </form>
    </div>
  );
}