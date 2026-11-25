import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const startRole = searchParams.get("role") === "provider" ? "provider" : "seeker";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: startRole,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await register(form.name, form.email, form.password, form.role);
    setLoading(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/login");
  }

  const inputClass = "mt-4 w-full rounded-xl bg-white/10 border border-white/30 px-4 py-3 text-sm text-[#F0FDFA] placeholder:text-[#99F6E4]/70 outline-none focus:border-[#FB7185]";
  return (
  <div className="min-h-[80vh] bg-[#042F2E] flex items-center justify-center px-5 py-10">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl bg-white/10 border border-white/25 p-6 text-[#F0FDFA]"
    >
      <h2 className="text-2xl font-medium">Create your account</h2>

      {error && (
        <p className="mt-4 rounded-lg border border-red-400/50 bg-red-500/20 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <input className={inputClass} name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
      <input className={inputClass} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className={inputClass} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

      <label className="mt-4 block text-sm text-[#CCFBF1]">I want to join as:</label>
      <select className={inputClass + " mt-2"} name="role" value={form.role} onChange={handleChange}>
        <option className="text-[#042F2E]" value="seeker">Opportunity Seeker</option>
        <option className="text-[#042F2E]" value="provider">Opportunity Provider</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-[#FB7185] py-3 text-base font-medium text-[#042F2E] disabled:opacity-60"
      >
        {loading ? "Please wait..." : "Create account"}
      </button>

      <p className="mt-5 text-center text-sm text-[#CCFBF1]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[#FB7185]">Log in</Link>
      </p>
    </form>
  </div>
);
}

export default Register;