import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Reads ?role=seeker or ?role=provider from the link
  const [searchParams] = useSearchParams();
  const startRole = searchParams.get("role") === "provider" ? "provider" : "seeker";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: startRole,
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = register(form.name, form.email, form.password, form.role);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/login");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create your account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        placeholder="Full name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <label>I want to join as:</label>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="seeker">Opportunity Seeker</option>
        <option value="provider">Opportunity Provider</option>
      </select>

      <button type="submit">Create account</button>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default Register;