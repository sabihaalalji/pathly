import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

async function callApi(payload) {
  console.log("API URL:", import.meta.env.VITE_API_URL);
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.log("API ERROR:", err);
    return { ok: false, message: "Could not reach the server. Try again." };
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  async function register(name, email, password, role) {
    return await callApi({ action: "register", name, email, password, role });
  }

  async function login(email, password) {
    const result = await callApi({ action: "login", email, password });
    if (result.ok) {
      setUser(result.user);
      localStorage.setItem("currentUser", JSON.stringify(result.user));
    }
    return result;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("currentUser");
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}