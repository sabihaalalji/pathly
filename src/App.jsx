
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicationForm from "./components/ApplicationForm.jsx";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Opportunities from "./pages/Opportunities";
import RoleInfo from "./pages/RoleInfo.jsx";
import Bookmarks from "./pages/Bookmarks";

const storageKey = "pathly.applications";
const seekerId = "sample-seeker";
const opportunityId = "sample-internship";

function readApplications() {
  const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");

  if (!Array.isArray(saved)) {
    throw new Error("Invalid saved applications");
  }

  return saved;
}

export default function App() {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [applications, setApplications] = useState(() => {
    try {
      return readApplications();
    } catch {
      return [];
    }
  });

  const myApplications = applications.filter(
    (application) => application.seekerId === seekerId
  );

  function handleApply(answer) {
    try {
      const savedApplications = readApplications();

      const alreadyApplied = savedApplications.some(
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

      const updatedApplications = [...savedApplications, newApplication];
      localStorage.setItem(storageKey, JSON.stringify(updatedApplications));
      setApplications(updatedApplications);
      setSubmissionMessage("Application submitted.");
    } catch {
      setSubmissionMessage("Could not save your application. Please try again.");
    }
  }
  function handleStatusChange(applicationId, nextStatus, ownedOpportunities){
    const allowedStatuses=["Shortlisted", "Accepted", "Rejected"];
    if(!allowedStatuses.includes(nextStatus)){
      return "Choose a valid application status.";
    }
    try{
      const savedApplications=readApplications();
      const application=savedApplications.find(
        (item)=>item.id === applicationId
      );
      if(!application){
        return "This application could not be found.";
      }
      const ownsListing=ownedOpportunities.some(
        (opportunity)=>String(opportunity.id) === String(application.opportunityId)
      );
      if(!ownsListing){
        return "You can only review application for your own listing.";
      }
      const updatedApplications=savedApplications.map((item)=>
      item.id === applicationId ? {...item, status:nextStatus}: item);
      localStorage.setItem(storageKey,JSON.stringify(updatedApplications));
      setApplications(updatedApplications);
      return "";
    } catch{
      return "Could not update the application status.Please try again.";
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/join/:type" element={<RoleInfo />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route
          path="/apply"
          element={
            <>
              <section>
                <h2>Apply for an opportunity</h2>
                <ApplicationForm onApply={handleApply} />
                {submissionMessage && <p>{submissionMessage}</p>}
              </section>

              <section>
                <h2>My Applications</h2>
                {myApplications.length === 0 ? (
                  <p>You have not submitted any applications yet.</p>
                ) : (
                  <ul>
                    {myApplications.map((application) => (
                      <li key={application.id}>
                        <p>Opportunity: {application.opportunityId}</p>
                        <p>Status: {application.status}</p>
                        <p>{application.statement}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
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
    </>
  );
}