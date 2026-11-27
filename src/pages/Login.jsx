
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(form.email, form.password);
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    const redirectPath = sessionStorage.getItem("redirectAfterLogin");
    sessionStorage.removeItem("redirectAfterLogin");

    navigate(redirectPath || "/home", { replace: true });
  }

  const inputClass = "mt-4 w-full rounded-xl bg-white/10 border border-white/30 px-4 py-3 text-sm text-[#F0FDFA] placeholder:text-[#99F6E4]/70 outline-none focus:border-[#FB7185]";

  return (
    <div className="min-h-[80vh] bg-[#042F2E] flex items-center justify-center px-5 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white/10 border border-white/25 p-6 text-[#F0FDFA]"
      >
        <h2 className="text-2xl font-medium">Welcome back!</h2>
        <p className="mt-1 text-sm text-[#CCFBF1]">
          Log in to find more opportunities and track your applications.
        </p>

        {location.state?.message && (
          <p className="mt-4 rounded-lg border border-[#FB7185]/50 bg-[#FB7185]/10 px-3 py-2 text-sm text-[#F0FDFA]">
            {location.state.message}
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg border border-red-400/50 bg-red-500/20 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <input
          className={inputClass}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className={inputClass}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#FB7185] py-3 text-base font-medium text-[#042F2E] disabled:opacity-60"
        >
          {loading ? "Please wait..." : "Log in"}
        </button>

        <p className="mt-5 text-center text-sm text-[#CCFBF1]">
          New here?{" "}
          <Link to="/register" className="font-medium text-[#FB7185]">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
