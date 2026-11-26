import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Opportunities from "./pages/Opportunities";
import ApplicationForm from "./components/ApplicationForm.jsx";
import RoleInfo from "./pages/RoleInfo.jsx";


export default function App() {
  const [submissionMessage, setSubmissionMessage] = useState("");

  function handleApply(answer) {
    const seekerId = "sample-seeker";
    const opportunityId = "sample-internship";
    const storageKey = "pathly.applications";

    try {
      const savedData = localStorage.getItem(storageKey);
      const applications = savedData ? JSON.parse(savedData) : [];

      const alreadyApplied = applications.some(
        (application) =>
          application.seekerId === seekerId &&
          application.opportunityId === opportunityId
      );

      if (alreadyApplied) {
        setSubmissionMessage("You have already applied for this opportunity.");
        return;
      }

      const newApplication = {
        id: crypto.randomUUID(),
        seekerId,
        opportunityId,
        statement: answer,
        status: "Submitted",
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        storageKey,
        JSON.stringify([...applications, newApplication])
      );

      setSubmissionMessage("Application submitted.");
    } catch {
      setSubmissionMessage("Could not save your application. Please try again.");
    }
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/join/:type" element={<RoleInfo />} />
        <Route
          path="/apply"
          element={
            <section>
              <h2>Apply for an opportunity</h2>
              <ApplicationForm onApply={handleApply} />
              {submissionMessage && <p>{submissionMessage}</p>}
            </section>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}